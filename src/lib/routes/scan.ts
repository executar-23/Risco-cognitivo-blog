// Descobre as rotas reais do repositório (usado por tests/routes.spec.ts e por /admin/rotas/).
// Só depende de node:fs — não importa código do Astro.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const PAGE_EXT = /\.(astro|mdx|md|html)$/;
const ENDPOINT_EXT = /\.(js|ts)$/;

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

function toPath(rel: string): string | null {
  const parts = rel.split(sep);
  if (parts.some((p) => p.startsWith("_") || p.includes("["))) return null; // parciais e rotas dinâmicas
  const last = parts[parts.length - 1];
  const isEndpoint = ENDPOINT_EXT.test(last);
  if (!PAGE_EXT.test(last) && !isEndpoint) return null;
  const base = last.replace(/\.(astro|mdx|md|html|js|ts)$/, "");
  if (base === "404") return null;
  const dirs = parts.slice(0, -1);
  if (isEndpoint) {
    // rss.xml.js -> /rss.xml
    return "/" + [...dirs, base].join("/");
  }
  const segs = base === "index" ? dirs : [...dirs, base];
  return segs.length ? `/${segs.join("/")}/` : "/";
}

/** Páginas e endpoints de src/pages (sem rotas dinâmicas nem 404). */
export function scanPages(root: string): string[] {
  const dir = join(root, "src/pages");
  return walk(dir)
    .map((f) => toPath(relative(dir, f)))
    .filter((p): p is string => p !== null);
}

/** Ferramentas estáticas: public/<pasta>/index.html vira /<pasta>/. */
export function scanPublicTools(root: string): string[] {
  const dir = join(root, "public");
  return walk(dir)
    .filter((f) => f.endsWith(`${sep}index.html`))
    .map((f) => `/${relative(dir, f).split(sep).slice(0, -1).join("/")}/`)
    .filter((p) => p !== "//");
}

/** Slugs de src/content/blog (viram /blog/<slug>/). */
export function scanBlogSlugs(root: string): string[] {
  const dir = join(root, "src/content/blog");
  return walk(dir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map((f) => relative(dir, f).replace(/\.(md|mdx)$/, "").split(sep).join("/"));
}

/** Rotas que o site gera automaticamente e que não têm arquivo próprio. */
export const GENERATED_ROUTES = ["/sitemap-index.xml"];
