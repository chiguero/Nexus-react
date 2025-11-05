import { Link } from 'react-router-dom';
import { useLibros } from '../hooks/useLibros';
import LibroCard from '../components/LibroCard';

export default function Landing() {
  const { libros, cargando } = useLibros();
  
  const destacados = libros.slice(0, 6);

  return (
    <div className="landing">
      <section className="hero">
        <h1>📚 Bienvenido a Nexus Books</h1>
        <p>Tu librería online de confianza</p>
        <p className="subtitle">Descubre miles de libros, autores y géneros</p>
        <Link to="/catalogo" className="btn-primary">
          Explorar Catálogo Completo
        </Link>
      </section>

      <section className="destacados">
        <h2>✨ Libros Destacados</h2>
        {cargando ? (
          <p className="loading">Cargando libros destacados...</p>
        ) : (
          <div className="libros-grid">
            {destacados.map(libro => (
              <LibroCard key={libro.id} libro={libro} />
            ))}
          </div>
        )}
        
        <div className="ver-mas">
          <Link to="/catalogo" className="btn-secondary">
            Ver Todos los Libros →
          </Link>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span className="icon">🚚</span>
          <h3>Envío Gratis</h3>
          <p>En pedidos superiores a 30€</p>
        </div>
        <div className="feature">
          <span className="icon">💳</span>
          <h3>Pago Seguro</h3>
          <p>Transacciones 100% protegidas</p>
        </div>
        <div className="feature">
          <span className="icon">📖</span>
          <h3>Gran Catálogo</h3>
          <p>Miles de títulos disponibles</p>
        </div>
        <div className="feature">
          <span className="icon">⭐</span>
          <h3>Reseñas Reales</h3>
          <p>Opiniones verificadas de lectores</p>
        </div>
      </section>
    </div>
  );
}