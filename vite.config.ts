import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    // necessary for PIXI.js
    global: 'window',
  },
});