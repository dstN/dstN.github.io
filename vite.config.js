import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoprefixer from "autoprefixer";
import path from "path";
import purgecss from "vite-plugin-purgecss";
import critical from "rollup-plugin-critical";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // (Critical CSS plugin removed due to lack of support)
    // (Compression plugins removed; not used by GitHub Pages)
    // Remove unused CSS
    purgecss({
      content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
      safelist: [/is-/, /has-/, /fa-/, /icon/], // keep Bulma/Vue/FontAwesome classes
    }),
  ],
  server: {
    port: 1337,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}), // add options if needed
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@composables": path.resolve(__dirname, "./src/composables"),
      "@handler": path.resolve(__dirname, "./src/handler"),
      "@util": path.resolve(__dirname, "./src/util"),
      "@node_modules": path.resolve(__dirname, "./node_modules"),
    },
  },
  build: {
    // Optimize build for better performance
    rollupOptions: {
      plugins: [
        critical({
          criticalUrl: './dist/index.html',
          criticalBase: './dist/',
          criticalPages: [
            { uri: '', template: 'index' },
          ],
          criticalConfig: {
            inline: true,
            extract: false,
            width: 430,
            height: 900,
          },
        }),
      ],
      output: {
        // Manual chunk splitting for better caching and loading
        manualChunks: {
          "vue-vendor": ["vue"],
        },
      },
    },
    // Reduce chunk size warning threshold
    chunkSizeWarningLimit: 600,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Use esbuild for minification (default, faster than terser)
    minify: "esbuild",
  },
});
