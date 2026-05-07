import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import pxtorem from 'postcss-pxtorem'

export default defineConfig({
  plugins: [
    react(),
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/static': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 16,
          propList: ['*', '!border', '!border-top', '!border-right', '!border-bottom', '!border-left'],
          replace: true,
          mediaQuery: false,
          minPixelValue: 2,
          unitPrecision: 5,
        }),
      ],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
