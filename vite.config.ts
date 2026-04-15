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
        years: path.resolve(__dirname, 'years/index.html'),
        enYears: path.resolve(__dirname, 'en/years/index.html'),
        faYears: path.resolve(__dirname, 'fa/years/index.html'),
        y2026: path.resolve(__dirname, '2026/index.html'),
        y2027: path.resolve(__dirname, '2027/index.html'),
        y2028: path.resolve(__dirname, '2028/index.html'),
        y2029: path.resolve(__dirname, '2029/index.html'),
        y2030: path.resolve(__dirname, '2030/index.html'),
        en2026: path.resolve(__dirname, 'en/2026/index.html'),
        en2027: path.resolve(__dirname, 'en/2027/index.html'),
        en2028: path.resolve(__dirname, 'en/2028/index.html'),
        en2029: path.resolve(__dirname, 'en/2029/index.html'),
        en2030: path.resolve(__dirname, 'en/2030/index.html'),
        fa2026: path.resolve(__dirname, 'fa/2026/index.html'),
        fa2027: path.resolve(__dirname, 'fa/2027/index.html'),
        fa2028: path.resolve(__dirname, 'fa/2028/index.html'),
        fa2029: path.resolve(__dirname, 'fa/2029/index.html'),
        fa2030: path.resolve(__dirname, 'fa/2030/index.html'),
      },
    },
  },
})
