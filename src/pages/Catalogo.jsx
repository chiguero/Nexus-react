import { useState } from 'react';
import { useLibros } from '../hooks/useLibros';
import LibroCard from '../components/LibroCard';

export default function Catalogo() {
  const [filtros, setFiltros] = useState({});
  const { libros, cargando, error } = useLibros(filtros);

  const handleBuscar = (e) => {
    const valor = e.target.value;
    if (valor.trim() === '') {
      setFiltros({});
    } else {
      setFiltros({ title: valor });
    }
  };

  return (
    <div className="catalogo">
      <h1>📚 Catálogo Completo</h1>
      
      <input
        type="text"
        placeholder="Buscar por título..."
        onChange={handleBuscar}
        className="buscador"
      />

      {cargando && <p className="loading">Cargando libros...</p>}
      {error && <p className="error">{error}</p>}

      <div className="libros-grid">
        {libros.map(libro => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </div>

      {!cargando && libros.length === 0 && (
        <p className="no-resultados">No se encontraron libros</p>
      )}
    </div>
  );
}