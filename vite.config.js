import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/crismp2/',  // ← IMPORTANTE: la ruta base de tu app
  server: {
    proxy: {
      '/apidog': {
        target: 'https://lawebdeperez.es',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})