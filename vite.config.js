import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
