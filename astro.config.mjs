import { defineConfig } from "astro/config";
import path from "node:path";

export default defineConfig({
  site: "https://dstn.github.io",
  output: "static",
  compressHTML: true,
  build: {
    assets: "_assets",
    inlineStylesheets: "auto",
  },
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },
});
