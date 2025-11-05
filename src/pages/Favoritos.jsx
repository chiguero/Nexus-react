import { useFavoritos } from '../hooks/useFavoritos';
import LibroCard from '../components/LibroCard';
import { Link } from 'react-router-dom';

export default function Favoritos() {
  const { favoritos } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <div className="favoritos-vacio">
        <h1>❤️ Mis Favoritos</h1>
        <p>Aún no tienes libros favoritos</p>
        <Link to="/catalogo" className="btn-primary">
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="favoritos">
      <h1>❤️ Mis Favoritos ({favoritos.length})</h1>
      
      <div className="libros-grid">
        {favoritos.map(libro => (
          <LibroCard key={libro.id} libro={libro} />
        ))}
      </div>
    </div>
  );
}