import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  base: "./", // Use relative paths for GitHub Pages
  build: {
    outDir: path.resolve(import.meta.dirname, "docs"),
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "client", "index.pages.html"),
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },
    },
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});