import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        ws: true,
        changeOrigin: true,
        target: "https://sda-onsite-mern-backend-project-8e6dua5v9-hussam-s-projects.vercel.app"
      }
    },
  },
  
  plugins: [react()]
})
