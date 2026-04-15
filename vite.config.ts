import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        en: path.resolve(__dirname, 'en/index.html'),
        fa: path.resolve(__dirname, 'fa/index.html'),
        y2026: path.resolve(__dirname, '2026/index.html'),
        y2027: path.resolve(__dirname, '2027/index.html'),
        en2026: path.resolve(__dirname, 'en/2026/index.html'),
        en2027: path.resolve(__dirname, 'en/2027/index.html'),
        fa2026: path.resolve(__dirname, 'fa/2026/index.html'),
        fa2027: path.resolve(__dirname, 'fa/2027/index.html'),
      },
    },
  },
})
