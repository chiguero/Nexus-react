import { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  // Inicializar con lazy initializer
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carrito');
      console.log('🚀 INICIALIZANDO carrito (solo 1 vez):', guardado);
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error('❌ Error al inicializar carrito:', error);
      return [];
    }
  });

  // Guardar cuando cambie
  useEffect(() => {
    console.log('💾 Guardando carrito:', carrito.length, 'items');
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (libro) => {
    console.log('🛒 Agregando al carrito:', libro.title, 'ID:', libro.id);
    
    setCarrito(prevCarrito => {
      console.log('   📋 Carrito actual:', prevCarrito.length);
      
      const existe = prevCarrito.find(item => item.id === libro.id);
      
      if (existe) {
        console.log('   ⚠️ Ya existe, incrementando cantidad');
        const nuevo = prevCarrito.map(item =>
          item.id === libro.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
        console.log('   ✅ Nueva cantidad:', nuevo.find(i => i.id === libro.id).cantidad);
        return nuevo;
      }
      
      console.log('   ✅ Agregando nuevo item al carrito');
      return [...prevCarrito, { ...libro, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (libroId) => {
    console.log('🗑️ Eliminando del carrito ID:', libroId);
    setCarrito(prevCarrito => prevCarrito.filter(item => item.id !== libroId));
  };

  const actualizarCantidad = (libroId, nuevaCantidad) => {
    console.log('🔢 Actualizando cantidad ID:', libroId, 'a', nuevaCantidad);
    
    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(libroId);
      return;
    }
    
    setCarrito(prevCarrito =>
      prevCarrito.map(item =>
        item.id === libroId
          ? { ...item, cantidad: nuevaCantidad }
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    console.log('🗑️ Vaciando carrito completo');
    setCarrito([]);
  };

  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrecio = carrito.reduce((sum, item) => sum + (item.price * item.cantidad), 0);

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      totalItems,
      totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  );
}