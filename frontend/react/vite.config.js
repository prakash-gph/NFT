import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from "vite-plugin-env-compatible"

// https://vite.dev/config/
export default defineConfig({
  // base:'/react/',
  envPrefix: "BACKENDURL",

  //   optimizeDeps: {
  //   include: ['swiper/react'],
  // },
  build:{

   rollupOptions: {
    external: ['react-player , swiper/react']
     
  }},
  plugins: [react(),
  envCompatible()],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  }
  })

