import { defineConfig } from 'vite';

export default defineConfig({
  base:"build",
  build: {
    outDir: './build',
  },
  define: {
    // necessary for PIXI.js
    global: 'window',
  },
});