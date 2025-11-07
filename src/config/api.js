// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.DEV;

// En desarrollo usa el proxy (/apidog), en producción usa la URL completa
export const API_BASE_URL = isDevelopment 
  ? "/apidog"  // Local → usa el proxy de Vite
  : "https://lawebdeperez.es/apidog";  // Producción → URL completa