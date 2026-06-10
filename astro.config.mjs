import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dstn.github.io",
  output: "static",
  compressHTML: true,
  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },
  vite: {
    build: {
      cssMinify: "lightningcss",
    },
  },
});
