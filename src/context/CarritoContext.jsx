import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const { estaLogueado } = useContext(AuthContext);
  
  // Inicializar estado con función (lazy initializer)
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem('carrito');
      console.log('🚀 INICIALIZANDO carrito (solo 1 vez):', guardado);
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error('❌ Error al inicializar:', error);
      return [];
    }
  });

  // Solo guardar cuando cambien los items del carrito
  useEffect(() => {
    console.log('💾 Guardando carrito:', carrito.length, 'items');
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Limpiar carrito cuando el usuario cierre sesión
  useEffect(() => {
    if (!estaLogueado) {
      console.log('🚪 Usuario cerró sesión, vaciando carrito');
      setCarrito([]);
      localStorage.removeItem('carrito');
    }
  }, [estaLogueado]);

  const agregarAlCarrito = (libro) => {
    console.log('➕ Intentando agregar:', libro.title, 'ID:', libro.id);
    
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
      
      const nuevos = [...prevCarrito, { ...libro, cantidad: 1 }];
      console.log('   ✅ Agregado! Total ahora:', nuevos.length);
      return nuevos;
    });
  };

  const eliminarDelCarrito = (libroId) => {
    console.log('➖ Intentando eliminar ID:', libroId);
    
    setCarrito(prevCarrito => {
      console.log('   📋 Carrito antes:', prevCarrito.length);
      const nuevo = prevCarrito.filter(item => item.id !== libroId);
      console.log('   ✅ Carrito después:', nuevo.length);
      return nuevo;
    });
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