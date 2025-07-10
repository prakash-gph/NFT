import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from "vite-plugin-env-compatible"

// https://vite.dev/config/
export default defineConfig({
  // base:'/react/',
  envPrefix: "BACKENDURL",
  plugins: [react(),
    envCompatible()],
    resolve: {
    extensions: ['.js', '.jsx', '.css']  // Add .css
  }
  
})
