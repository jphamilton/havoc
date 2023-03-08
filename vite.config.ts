import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './build',
  },
  define: {
    // necessary for PIXI.js
    global: 'window',
  },
});