import { expect, test, type Page } from "@playwright/test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";


import { contrast, expectTheme, useTheme } from "./theme";

// Surface & Elevation contract (ADR-08 / DS-SURFACE-UNIFICATION-001).
const ROOT = process.cwd();
const SHOWROOM = "/admin/design-system/";

/** Resolves a CSS value (tokens included) to its computed colour/shadow through a probe. */
async function resolve(page: Page, prop: "color" | "background-color" | "box-shadow", value: string) {
  return page.evaluate(
    ([p, v]) => {
      const el = document.createElement("div");
      el.style.setProperty(p, v);
      document.body.appendChild(el);
      const out = getComputedStyle(el).getPropertyValue(p);
      el.remove();
      return out;
    },
    [prop, value],
  );
}

/** True when any layer of a computed box-shadow is actually painted (Tailwind's shadow-none computes to transparent layers). */
function paintsShadow(value: string) {
  if (value === "none") return false;
  return [...value.matchAll(/rgba?\(([^)]*)\)\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px/g)].some((m) => {
    const parts = m[1].split(",").map((x) => parseFloat(x));
    const alpha = parts.length === 4 ? parts[3] : 1;
    return alpha > 0 && [m[2], m[3], m[4]].some((n) => parseFloat(n) !== 0);
  });
}

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const f = join(dir, n);
    return statSync(f).isDirectory() ? walk(f) : [f];
  });
}
const src = walk(join(ROOT, "src")).filter((f) => /\.(tsx?|astro|mdx?|css)$/.test(f));

test.describe("source contract", () => {
  test("neutral hex values live only in the token layer (global.css)", () => {
    const offenders = src
      .filter((f) => !f.endsWith(join("styles", "global.css")))
      .filter((f) => /#f8f8f8|#ebebeb/i.test(readFileSync(f, "utf-8")))
      .map((f) => relative(ROOT, f));
    expect(offenders, "#F8F8F8 / #EBEBEB só em src/styles/global.css").toEqual([]);
  });

  test("shadow-md/lg/xl/2xl only on overlays; no shadow-sm on cards", () => {
    const overlay = new Set(
      ["dialog", "sheet", "alert-dialog", "drawer", "popover", "hover-card", "dropdown-menu", "context-menu", "menubar", "select", "navigation-menu", "tooltip", "chart"].map(
        (n) => `src/components/ui/${n}.tsx`,
      ),
    );
    const heavy = /shadow-(md|lg|xl|2xl)\b/;
    const offenders = src
      .filter((f) => /\.(tsx|astro)$/.test(f))
      .map((f) => relative(ROOT, f))
      .filter((f) => !overlay.has(f) && f !== "src/components/blocks/hero.tsx") // hero.tsx: screenshot image, not a card
      .filter((f) => heavy.test(readFileSync(join(ROOT, f), "utf-8")));
    expect(offenders, "sombra de overlay fora de um overlay").toEqual([]);

    const sm = /shadow-sm\b/;
    const allowedSm = new Set(["src/components/ui/tabs.tsx", "src/components/ui/slider.tsx", "src/components/ui/sidebar.tsx"]);
    const smOffenders = src
      .filter((f) => /\.(tsx|astro)$/.test(f))
      .map((f) => relative(ROOT, f))
      .filter((f) => !allowedSm.has(f) && sm.test(readFileSync(join(ROOT, f), "utf-8")));
    expect(smOffenders, "shadow-sm em card").toEqual([]);
  });

  test("cards (Card component, admin and hub) declare no shadow", () => {
    const card = readFileSync(join(ROOT, "src/components/ui/card.tsx"), "utf-8");
    expect(card).toContain("shadow-none");
    expect(card).not.toMatch(/shadow-(xs|sm|md|lg|xl)/);
  });
});

test.describe("tokens", () => {
  test("surface contract values and aliases", async ({ page }) => {
    await page.goto(SHOWROOM);
    const expected: Record<string, string> = {
      "--surface-default": "rgb(248, 248, 248)",
      "--surface-subtle": "rgb(250, 250, 250)",
      "--surface-hover": "rgb(243, 243, 243)",
      "--surface-selected": "rgb(238, 238, 238)",
      "--border-subtle": "rgb(240, 240, 240)",
      "--border-default": "rgb(235, 235, 235)",
      "--border-strong": "rgb(218, 218, 218)",
    };
    for (const [token, rgb] of Object.entries(expected)) expect(await resolve(page, "background-color", `var(${token})`), token).toBe(rgb);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--elevation-flat").trim())).toBe("none");
    // aliases resolve to the same colours: no parallel visual system
    for (const [alias, base] of [
      ["--plain-surface", "--surface-default"],
      ["--plain-border", "--border-default"],
      ["--card", "--surface-default"],
      ["--border", "--border-default"],
      ["--muted", "--surface-hover"],
      ["--surface-neutral", "--surface-default"],
      ["--surface-neutral-border", "--border-default"],
    ] as const) {
      expect(await resolve(page, "background-color", `var(${alias})`), alias).toBe(await resolve(page, "background-color", `var(${base})`));
    }
    // shadow scale collapses to the two elevation levels
    expect(await resolve(page, "box-shadow", "var(--shadow-sm)")).toBe(await resolve(page, "box-shadow", "var(--elevation-raised)"));
    for (const s of ["md", "lg", "xl"]) expect(await resolve(page, "box-shadow", `var(--shadow-${s})`)).toBe(await resolve(page, "box-shadow", "var(--elevation-overlay)"));
  });

  for (const theme of ["light", "dark"] as const) {
    test(`text, brand and surfaces keep AA (${theme})`, async ({ page }) => {
      await useTheme(page, theme);
      await page.goto(SHOWROOM);
      await expectTheme(page, theme);
      const c = async (fg: string, bg: string) =>
        contrast(page, await resolve(page, "color", `var(${fg})`), await resolve(page, "background-color", `var(${bg})`));

      // primary text on every neutral surface, and secondary gray on all of them
      for (const bg of ["--surface-page", "--surface-default", "--surface-hover", "--surface-selected"]) {
        expect(await c("--foreground", bg), `foreground on ${bg}`).toBeGreaterThanOrEqual(7);
        expect(await c("--muted-foreground", bg), `muted-foreground on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
      // extra gray only on page/card surfaces
      for (const bg of ["--surface-page", "--surface-default"]) {
        expect(await c("--muted-foreground-subtle", bg), `subtle on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
      // brand blue: links/titles on page + card, and button text on it
      for (const bg of ["--surface-page", "--surface-default"]) {
        expect(await c("--primary", bg), `primary on ${bg}`).toBeGreaterThanOrEqual(theme === "light" ? 4.5 : 4.5);
      }
      expect(await c("--primary-foreground", "--primary"), "button label").toBeGreaterThanOrEqual(4.5);
      if (theme === "light") expect(await c("--primary-foreground", "--primary-hover"), "button label (hover)").toBeGreaterThanOrEqual(4.5);
    });
  }
});

test.describe("flat cards, real overlays", () => {
  const flat = async (page: Page, sel: string) => {
    const els = page.locator(sel);
    const n = await els.count();
    expect(n, sel).toBeGreaterThan(0);
    return els.evaluateAll((nodes) =>
      nodes.map((el) => {
        const cs = getComputedStyle(el);
        return { bg: cs.backgroundColor, border: cs.borderTopColor, shadow: cs.boxShadow };
      }),
    );
  };

  for (const [route, sel] of [
    [SHOWROOM, "[data-testid=kpi]"],
    ["/admin/", "a.bg-card"],
    ["/admin/rotas/", ".route-card"],
    ["/loja/", "[data-slot=card]"],
  ] as const) {
    test(`${route} ${sel}: neutral surface, subtle border, no shadow`, async ({ page }) => {
      await page.goto(route);
      for (const s of await flat(page, sel)) {
        expect({ bg: s.bg, border: s.border }).toEqual({ bg: "rgb(248, 248, 248)", border: "rgb(235, 235, 235)" });
        expect(paintsShadow(s.shadow), `shadow: ${s.shadow}`).toBe(false);
      }
    });
  }

  test("admin card hover changes surface, never adds a shadow", async ({ page }) => {
    await page.goto("/admin/");
    const card = page.locator("a.bg-card").first();
    await card.hover();
    await expect.poll(() => card.evaluate((e) => getComputedStyle(e).backgroundColor)).toBe("rgb(243, 243, 243)");
    expect(paintsShadow(await card.evaluate((e) => getComputedStyle(e).boxShadow))).toBe(false);
  });

  test("a table inside a card keeps visible cells (page surface), a standalone table keeps the neutral one", async ({ page }) => {
    await page.goto(SHOWROOM);
    await page.locator("#dados").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-testid=charts] .recharts-surface").first()).toBeVisible();
    await page.waitForLoadState("networkidle");
    await page.getByRole("tab", { name: "Tabela" }).click();
    const inCard = await page.locator("[data-slot=card] .ds-table td").first().evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(inCard).toBe(await resolve(page, "background-color", "var(--surface-page)"));
    const standalone = await page.locator("[data-testid=table-reference] .ds-table td").first().evaluate((e) => getComputedStyle(e).backgroundColor);
    expect(standalone).toBe("rgb(248, 248, 248)");
  });

  test("dialog is a real overlay: elevation-overlay shadow, page surface", async ({ page }) => {
    await page.goto(SHOWROOM);
    await page.locator("#componentes").scrollIntoViewIfNeeded();
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "Abrir dialog" }).click();
    const content = page.locator("[data-slot=dialog-content]");
    await expect(content).toBeVisible();
    const style = await content.evaluate((e) => ({ shadow: getComputedStyle(e).boxShadow, bg: getComputedStyle(e).backgroundColor }));
    expect(paintsShadow(style.shadow)).toBe(true);
    expect(style.shadow.endsWith(await resolve(page, "box-shadow", "var(--elevation-overlay)"))).toBe(true);
    expect(style.bg).toBe(await resolve(page, "background-color", "var(--surface-page)"));
  });

  test("showroom documents the three elevation levels", async ({ page }) => {
    await page.goto(SHOWROOM);
    for (const n of ["elevation-flat", "elevation-raised", "elevation-overlay"]) await expect(page.locator(`[data-elevation=${n}]`)).toHaveCount(1);
    await expect(page.getByTestId("surface-scale").locator("[data-surface-token]")).toHaveCount(8);
  });
});

test.describe("visual regression (minimum routes)", () => {
  const shots: [string, string][] = [
    ["admin", "/admin/"],
    ["blog", "/blog/"],
    ["article", "/blog/do-risco-cognitivo-a-execucao-assistida/"],
    ["loja", "/loja/"],
  ];
  for (const [name, route] of shots) {
    for (const [label, size] of [["desktop", { width: 1280, height: 900 }], ["mobile", { width: 390, height: 844 }]] as const) {
      test(`${name} ${label}`, async ({ page }) => {
        await page.setViewportSize(size);
        await page.goto(route);
        await page.waitForLoadState("networkidle");
        await expect(page).toHaveScreenshot(`surface-${name}-${label}.png`, { threshold: 0.01, maxDiffPixelRatio: 0.002 });
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(0);
      });
    }
  }
});
