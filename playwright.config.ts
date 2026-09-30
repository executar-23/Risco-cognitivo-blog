import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  use: { baseURL: "http://localhost:4331" },
  webServer: {
    command: "npx astro preview --port 4331",
    url: "http://localhost:4331/blog/",
    reuseExistingServer: !process.env.CI,
  },
});
