interface Env {
  // Serves the pre-built Astro output declared under "assets" in wrangler.jsonc
  ASSETS: Fetcher;
}

export default {
  async fetch(request, env): Promise<Response> {
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
