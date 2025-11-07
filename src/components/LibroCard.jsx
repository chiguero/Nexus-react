import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useCarrito } from '../hooks/useCarrito';
import { useFavoritos } from '../hooks/useFavoritos';
import { obtenerPortada } from '../config/imagenesPortadas';

export default function LibroCard({ libro }) {
  const { estaLogueado } = useContext(AuthContext);
  const { agregarAlCarrito } = useCarrito();
  const { esFavorito, toggleFavorito } = useFavoritos();
  const navigate = useNavigate();

  const imagenPortada = obtenerPortada(libro.id, libro.coverImage);

  const handleAgregarCarrito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // ✅ VERIFICAR SI ESTÁ LOGUEADO ANTES DE AGREGAR AL CARRITO
    if (!estaLogueado) {
      alert('⚠️ Debes iniciar sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }
    
    console.log('🛒 Intentando agregar al carrito:', libro);
    agregarAlCarrito(libro);
    alert(`"${libro.title}" añadido al carrito`);
  };

  const handleToggleFavorito = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Verificar si está logueado
    if (!estaLogueado) {
      alert('⚠️ Debes iniciar sesión para agregar favoritos');
      navigate('/login');
      return;
    }
    
    console.log('❤️ Toggle favorito:', libro.title);
    toggleFavorito(libro);
  };

  const favorito = esFavorito(libro.id);

  return (
    <div className="libro-card">
      <button 
        onClick={handleToggleFavorito} 
        className={`btn-favorito ${favorito ? 'activo' : ''}`}
        aria-label="Agregar a favoritos"
        type="button"
      >
        {favorito ? '❤️' : '🤍'}
      </button>

      <Link to={`/libro/${libro.id}`}>
        <img 
          src={imagenPortada} 
          alt={libro.title}
          loading="lazy"
        />
        <h3>{libro.title}</h3>
        <p className="autor">{libro.author.name}</p>
        <p className="categoria">{libro.category.name}</p>
        <p className="precio">{libro.price}€</p>
      </Link>

      <button 
        onClick={handleAgregarCarrito} 
        className="btn-agregar"
        type="button"
      >
        🛒 Añadir al carrito
      </button>
    </div>
  );
}