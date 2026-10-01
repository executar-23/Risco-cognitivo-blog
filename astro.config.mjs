// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import remarkPlain from "./src/lib/plain/remarkPlain.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx({ remarkPlugins: [remarkPlain] }), sitemap(), react()],
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },
});
