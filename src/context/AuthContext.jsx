import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const EXPIRACION_SESION = 24 * 60 * 60 * 1000; // 24 horas en ms

export function AuthProvider({ children }) {
  const [estaLogueado, setEstaLogueado] = useState(() => {
    const sesion = localStorage.getItem('sesion');
    const timestamp = localStorage.getItem('sesionTimestamp');
    
    if (sesion && timestamp) {
      const ahora = Date.now();
      const tiempoTranscurrido = ahora - parseInt(timestamp);
      
      // Si pasaron más de 24 horas, cerrar sesión
      if (tiempoTranscurrido > EXPIRACION_SESION) {
        localStorage.removeItem('sesion');
        localStorage.removeItem('sesionTimestamp');
        localStorage.removeItem('usuario');
        return false;
      }
      
      return JSON.parse(sesion);
    }
    
    return false;
  });

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  useEffect(() => {
    localStorage.setItem('sesion', JSON.stringify(estaLogueado));
    
    if (estaLogueado) {
      localStorage.setItem('sesionTimestamp', Date.now().toString());
    }
    
    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('usuario');
    }
  }, [estaLogueado, usuario]);

  const login = (datosUsuario) => {
    setEstaLogueado(true);
    setUsuario(datosUsuario);
  };

  const logout = () => {
    setEstaLogueado(false);
    setUsuario(null);
    localStorage.removeItem('sesion');
    localStorage.removeItem('sesionTimestamp');
    localStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ estaLogueado, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}