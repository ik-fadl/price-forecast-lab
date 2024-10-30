// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import legacy from '@vitejs/plugin-legacy'
// import dynamicImport from 'vite-plugin-dynamic-import'

// // https://vite.dev/config/
// export default defineConfig({
//   base: '/price-forecast-lab',
//   optimizeDeps: {
//     exclude: ['blip-ds/loader'],
//   },
//   plugins: [vue(), legacy(), dynamicImport()],
//   resolve: {
//     alias: {
//       '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://www.bi.go.id/hargapangan/WebSite/TabelHarga/',
//         changeOrigin: true,
//         secure: false,
//         rewrite: path => path.replace(/^\/api/, ''),
//       },
//     },
//   },
//   build: {
//     chunkSizeWarningLimit: 1600,
//   },
// })
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import dynamicImport from 'vite-plugin-dynamic-import'

export default defineConfig({
  base: '/',
  optimizeDeps: {
    exclude: ['blip-ds/loader'],
  },
  plugins: [vue(), legacy(), dynamicImport()],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.bi.go.id/hargapangan/WebSite/TabelHarga/',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
