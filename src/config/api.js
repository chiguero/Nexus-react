// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.DEV;

// En desarrollo usa el proxy, en producción usa la URL completa
export const API_BASE_URL = isDevelopment 
  ? "/apidog" 
  : "https://lawebdeperez.es/apidog";