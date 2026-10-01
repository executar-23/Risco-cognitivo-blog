import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.string().optional(),
    authorImage: z.string().optional(),
    authorName: z.string().optional(),
    // Banco editorial (src/data/editorial/seed.json) — HANDOFF-RC-GLOBAL-DESIGN-CONTENT-001
    /** ID do registro de conteúdo no banco (CNT-RC-0001). Ausente em peças sem registro. */
    contentId: z.string().regex(/^CNT-RC-\d{4}$/).optional(),
    /** Slug do território (TAX-RC-*), sem barras: `risco-cognitivo`. */
    territory: z.string(),
    type: z.enum(["artigo", "guia", "mapa", "ensaio"]).default("artigo"),
    tags: z.array(z.string()).default([]),
    /** IDs EVD-RC-* citados no texto. */
    evidence: z.array(z.string().regex(/^EVD-RC-\d{4}$/)).default([]),
    seoTitle: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
