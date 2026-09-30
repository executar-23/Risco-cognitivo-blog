import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const SHOWROOM = "/admin/design-system/";
const ARTICLE = "/blog/do-risco-cognitivo-a-execucao-assistida/";
const WIDTHS = [320, 375, 768, 1024, 1440];

// Resolves any CSS colour (oklch included) to sRGB through a canvas and returns
// the WCAG contrast ratio between two computed colours.
async function contrast(page: Page, fg: string, bg: string) {
  return page.evaluate(
    ([a, b]) => {
      const ctx = document.createElement("canvas").getContext("2d")!;
      const rgb = (c: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = c;
        ctx.fillRect(0, 0, 1, 1);
        return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)).map((v) => {
          const s = v / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        });
      };
      const lum = (c: string) => {
        const [r, g, bl] = rgb(c);
        return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
      };
      const [x, y] = [lum(a), lum(b)];
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    },
    [fg, bg],
  );
}

test.describe("Callout — visual regression", () => {
  for (const width of WIDTHS) {
    test(`showroom callouts @${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(SHOWROOM);
      await expect(page.getByTestId("callout-reference")).toHaveScreenshot(`reference-${width}.png`);
      await expect(page.getByTestId("callout-variants")).toHaveScreenshot(`variants-${width}.png`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test(`article callouts @${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(ARTICLE);
      const callouts = page.locator("[data-callout]");
      await expect(callouts).toHaveCount(7);
      await expect(callouts.first()).toHaveScreenshot(`article-decision-${width}.png`);
      // no horizontal overflow at any width
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }
});

test("reference approved/md derives from Button/radius/font tokens", async ({ page }) => {
  await page.goto(SHOWROOM);
  const m = await page.locator("[data-testid=callout-reference] [data-callout]").evaluate((el) => {
    const row = el.firstElementChild as HTMLElement;
    const glyph = el.querySelector("svg") as SVGElement;
    const subject = getComputedStyle(el.querySelector("strong")!);
    const message = getComputedStyle(el.querySelector("p span")!);
    return {
      height: Math.round(el.getBoundingClientRect().height),
      radius: getComputedStyle(el).borderRadius,
      padding: getComputedStyle(row).paddingLeft,
      gap: getComputedStyle(row).columnGap,
      glyph: getComputedStyle(glyph).width,
      subject: subject.fontWeight,
      message: message.fontWeight,
      subjectMono: /mono/i.test(subject.fontFamily),
      messageMono: /mono/i.test(message.fontFamily),
    };
  });
  expect(m).toEqual({
    height: 40,
    radius: "8px",
    padding: "12px",
    gap: "8px",
    glyph: "18px",
    subject: "700",
    message: "400",
    subjectMono: false,
    messageMono: true,
  });
  // same height as the CTA button (Button lg)
  const cta = await page.getByTestId("cta-reference").boundingBox();
  expect(Math.round(cta!.height)).toBe(m.height);
});

test("26 variants, one symbol each, 3 families only", async ({ page }) => {
  await page.goto(SHOWROOM);
  const variants = page.locator("[data-testid=callout-variants] [data-callout]");
  await expect(variants).toHaveCount(26);
  const families = await variants.evaluateAll((els) => [...new Set(els.map((e) => e.getAttribute("data-family")))]);
  expect(families.sort()).toEqual(["attention", "brand", "critical"]);
  const icons = await variants.evaluateAll((els) => els.map((e) => e.querySelectorAll("svg").length));
  expect(icons.every((n) => n === 1)).toBe(true);
});

for (const theme of ["light", "dark"] as const) {
  test(`AA contrast for every variant and layout (${theme})`, async ({ page }) => {
    await page.goto(SHOWROOM);
    if (theme === "dark") await page.evaluate(() => document.documentElement.classList.add("dark"));
    const pairs = await page.locator("[data-callout]").evaluateAll((els) =>
      els.map((el) => {
        const c = (q: string, prop: "color" | "backgroundColor") => {
          const n = el.querySelector(q) as HTMLElement | null;
          return n ? getComputedStyle(n)[prop] : null;
        };
        const root = getComputedStyle(el);
        const header = el.querySelector("[data-callout-header]") as HTMLElement | null;
        const primary = el.querySelector("[data-callout-footer] > :last-child") as HTMLElement | null;
        return {
          id: `${el.getAttribute("data-variant")}/${el.getAttribute("data-tone")}/${el.getAttribute("data-layout")}`,
          text: root.color,
          surface: root.backgroundColor,
          icon: c("svg", "color"),
          iconBg: c("[data-callout-emblem]", "backgroundColor") ?? root.backgroundColor,
          headerText: header ? getComputedStyle(header.querySelector("p")!).color : null,
          headerBg: header ? getComputedStyle(header).backgroundColor : null,
          title: c("[data-callout-body] p", "color"),
          actionText: primary && !primary.hasAttribute("disabled") ? getComputedStyle(primary).color : null,
          actionBg: primary && !primary.hasAttribute("disabled") ? getComputedStyle(primary).backgroundColor : null,
        };
      }),
    );
    for (const p of pairs) {
      expect(await contrast(page, p.text, p.surface), p.id).toBeGreaterThanOrEqual(4.5);
      if (p.icon) expect(await contrast(page, p.icon, p.iconBg), `${p.id} icon`).toBeGreaterThanOrEqual(3);
      if (p.headerText && p.headerBg)
        expect(await contrast(page, p.headerText, p.headerBg), `${p.id} header`).toBeGreaterThanOrEqual(4.5);
      if (p.title) expect(await contrast(page, p.title, p.surface), `${p.id} title`).toBeGreaterThanOrEqual(4.5);
      if (p.actionText && p.actionBg)
        expect(await contrast(page, p.actionText, p.actionBg), `${p.id} action`).toBeGreaterThanOrEqual(4.5);
    }
  });
}

test("full anatomy: header, emblem only in outline, footer actions on the right", async ({ page }) => {
  await page.goto(SHOWROOM);
  const cards = page.locator("[data-testid=callout-anatomy] [data-callout]");
  await expect(cards).toHaveCount(8);
  const m = await cards.evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      const header = el.querySelector("[data-callout-header]")!;
      const last = el.querySelector("[data-callout-footer] > :last-child")!.getBoundingClientRect();
      return {
        tone: el.getAttribute("data-tone"),
        layout: el.getAttribute("data-layout"),
        label: header.textContent?.trim(),
        closeInHeader: !!header.querySelector('button[aria-label="Fechar aviso"]'),
        emblems: el.querySelectorAll("[data-callout-emblem]").length,
        rightGap: Math.round(r.right - last.right),
        titleMono: /mono/i.test(getComputedStyle(el.querySelector("[data-callout-body] p")!).fontFamily),
      };
    }),
  );
  for (const c of m) {
    expect(c.layout).toBe("full");
    expect(c.label).toBeTruthy();
    expect(c.closeInHeader).toBe(true);
    expect(c.emblems).toBe(c.tone === "outline" ? 1 : 0);
    expect(c.rightGap).toBeLessThanOrEqual(17);
    expect(c.titleMono).toBe(true);
  }
  // short callouts stay compact
  await page.goto(ARTICLE);
  const layouts = await page.locator("[data-callout]").evaluateAll((els) =>
    els.map((e) => `${e.getAttribute("data-variant")}:${e.getAttribute("data-layout")}`),
  );
  expect(layouts.filter((l) => l.startsWith("question") || l.startsWith("quote")).every((l) => l.endsWith("compact"))).toBe(true);
  expect(layouts.filter((l) => /^(decision|example|note):/.test(l)).every((l) => l.endsWith("full"))).toBe(true);
});

test("axe: no serious or critical issues in callouts and article", async ({ page }) => {
  for (const [url, include] of [
    [SHOWROOM, "#callouts"],
    [ARTICLE, "article, main"],
  ] as const) {
    await page.goto(url);
    await page.waitForLoadState("networkidle");
    const { violations } = await new AxeBuilder({ page }).include(include).analyze();
    const blocking = violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(blocking, JSON.stringify(blocking.map((v) => [v.id, v.nodes.length]))).toEqual([]);
  }
});

test("keyboard: dismiss is reachable and closes the callout", async ({ page }) => {
  await page.goto(SHOWROOM);
  const close = page
    .locator("[data-callout]")
    .filter({ hasText: "pode ser fechado" })
    .getByRole("button", { name: "Fechar aviso" });
  await close.scrollIntoViewIfNeeded();
  await expect(close).toBeVisible();
  await page.waitForLoadState("networkidle");
  await close.focus();
  await expect(close).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator('[data-callout][data-variant="attention"][data-tone="outline"]').filter({ hasText: "pode ser fechado" })).toHaveCount(0);
});

test("prefers-reduced-motion removes callout transitions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(SHOWROOM);
  const duration = await page
    .getByRole("button", { name: "Fechar aviso" })
    .first()
    .evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(duration.split(",").every((d) => parseFloat(d) === 0)).toBe(true);
});
