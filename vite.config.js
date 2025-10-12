import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',                 // listen on all interfaces
    port: 5173,
    strictPort: true,
    origin: 'http://10.214.228.94:5173', // force LAN IP as origin
  }
})
