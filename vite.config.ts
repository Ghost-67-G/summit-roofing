import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { devSsr } from './scripts/dev-ssr-plugin.ts'

export default defineConfig({
  // Multi-page static site: no SPA fallback, so `vite preview` 404s like a real host.
  appType: 'mpa',
  plugins: [react(), tailwindcss(), devSsr()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    // Keep small assets (icons, tiny CSS) as separate cacheable files.
    assetsInlineLimit: 0,
  },
})
