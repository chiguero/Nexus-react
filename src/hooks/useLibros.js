import { useState, useEffect } from 'react';
import { obtenerLibros } from '../services/apidogService';

export function useLibros(filtros = {}) {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const datos = await obtenerLibros(filtros);
        setLibros(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [JSON.stringify(filtros)]);

  return { libros, cargando, error };
}