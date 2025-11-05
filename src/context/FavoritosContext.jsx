import { createContext, useState, useEffect } from 'react';

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  // Inicializar estado con función (lazy initializer)
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = localStorage.getItem('favoritos');
      console.log('🚀 INICIALIZANDO favoritos (solo 1 vez):', guardados);
      return guardados ? JSON.parse(guardados) : [];
    } catch (error) {
      console.error('❌ Error al inicializar:', error);
      return [];
    }
  });

  // Solo guardar cuando cambien los favoritos
  useEffect(() => {
    console.log('💾 Guardando favoritos:', favoritos.length, 'libros');
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }, [favoritos]);

  const agregarFavorito = (libro) => {
    console.log('➕ Intentando agregar:', libro.title, 'ID:', libro.id);
    
    setFavoritos(prevFavoritos => {
      console.log('   📋 Favoritos actuales:', prevFavoritos.length);
      
      const existe = prevFavoritos.find(item => item.id === libro.id);
      
      if (existe) {
        console.log('   ⚠️ Ya existe, no se agrega');
        return prevFavoritos;
      }
      
      const nuevos = [...prevFavoritos, libro];
      console.log('   ✅ Agregado! Total ahora:', nuevos.length);
      return nuevos;
    });
  };

  const eliminarFavorito = (libroId) => {
    console.log('➖ Intentando eliminar ID:', libroId);
    
    setFavoritos(prevFavoritos => {
      console.log('   📋 Favoritos antes:', prevFavoritos.length);
      const nuevos = prevFavoritos.filter(item => item.id !== libroId);
      console.log('   ✅ Favoritos después:', nuevos.length);
      return nuevos;
    });
  };

  const toggleFavorito = (libro) => {
    console.log('🔄 Toggle para:', libro.title);
    
    setFavoritos(prevFavoritos => {
      const existe = prevFavoritos.find(item => item.id === libro.id);
      
      if (existe) {
        console.log('   ❌ Quitando de favoritos');
        return prevFavoritos.filter(item => item.id !== libro.id);
      } else {
        console.log('   ✅ Agregando a favoritos');
        return [...prevFavoritos, libro];
      }
    });
  };

  const esFavorito = (libroId) => {
    return favoritos.some(item => item.id === libroId);
  };

  const vaciarFavoritos = () => {
    setFavoritos([]);
  };

  return (
    <FavoritosContext.Provider value={{
      favoritos,
      agregarFavorito,
      eliminarFavorito,
      toggleFavorito,
      esFavorito,
      vaciarFavoritos
    }}>
      {children}
    </FavoritosContext.Provider>
  );
}