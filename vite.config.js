import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  // En desarrollo (npm run dev) no usar base
  // En producción (npm run build) usar /crismp2/
  const base = command === 'build' ? '/crismp2/' : '/';
  
  return {
    plugins: [react()],
    base: base,
    server: {
      proxy: {
        '/apidog': {
          target: 'https://lawebdeperez.es',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})