/** The browser shell: `bun run web` (dev server), `bun run web:build` (into dist/web). */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: { outDir: '../dist/web', emptyOutDir: true },
});
