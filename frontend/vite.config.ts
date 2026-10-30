import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all network addresses (0.0.0.0) to display the 192.168.x.x phone URL
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_BACKEND_TARGET || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
