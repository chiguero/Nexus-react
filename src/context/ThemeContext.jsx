import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Inicializar desde localStorage
  const [modoOscuro, setModoOscuro] = useState(() => {
    const guardado = localStorage.getItem('modoOscuro');
    return guardado ? JSON.parse(guardado) : false;
  });

  // Aplicar clase al body cuando cambie
  useEffect(() => {
    console.log('🌙 Aplicando tema:', modoOscuro ? 'oscuro' : 'claro');
    
    if (modoOscuro) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Guardar en localStorage
    localStorage.setItem('modoOscuro', JSON.stringify(modoOscuro));
  }, [modoOscuro]);

  const toggleTema = () => {
    setModoOscuro(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ modoOscuro, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
};