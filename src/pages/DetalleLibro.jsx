import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { obtenerLibroPorId, obtenerResenas, crearResena } from '../services/apidogService';
import { useCarrito } from '../hooks/useCarrito';
import { useFavoritos } from '../hooks/useFavoritos';
import { obtenerPortada } from '../config/imagenesPortadas';

export default function DetalleLibro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { estaLogueado } = useContext(AuthContext);
  const [libro, setLibro] = useState(null);
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { agregarAlCarrito } = useCarrito();
  const { esFavorito, toggleFavorito } = useFavoritos();

  useEffect(() => {
    cargarDatos();
  }, [id]);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const libroData = await obtenerLibroPorId(id);
      const todasResenas = await obtenerResenas(id);
    
      const resenasDelLibro = (todasResenas || []).filter(
        resena => resena.bookId === Number(id)
      );
    
      setLibro(libroData);
      setResenas(resenasDelLibro);
    } catch (error) {
      console.error('Error al cargar libro:', error);
      setResenas([]);
    } finally {
      setCargando(false);
    }
  };

  const handleAgregarCarrito = () => {
    if (!estaLogueado) {
      alert('⚠️ Debes iniciar sesión para agregar productos al carrito');
      navigate('/login');
      return;
    }

    agregarAlCarrito(libro);
    alert(`"${libro.title}" añadido al carrito`);
  };

  const handleToggleFavorito = () => {
    if (!estaLogueado) {
      alert('⚠️ Debes iniciar sesión para agregar favoritos');
      navigate('/login');
      return;
    }

    toggleFavorito(libro);
  };

  const handleSubmitResena = async (e) => {
    e.preventDefault();
    try {
      await crearResena({
        bookId: Number(id),
        rating,
        comment,
        date: new Date().toISOString()
      });
      alert('¡Reseña publicada!');
      setComment('');
      cargarDatos();
    } catch (error) {
      alert('Error al publicar reseña');
    }
  };

  if (cargando) return <div className="loading">Cargando...</div>;
  if (!libro) return <div className="error">Libro no encontrado</div>;

  const imagenPortada = obtenerPortada(libro.id, libro.coverImage);

  return (
    <div className="detalle-libro">
      <div className="libro-info">
        <img src={imagenPortada} alt={libro.title} />
        
        <div className="libro-datos">
          <h1>{libro.title}</h1>
          <p className="autor">Por {libro.author.name}</p>
          <p className="categoria">📚 {libro.category.name}</p>
          <p className="editorial">🏢 {libro.publisher.name}</p>
          <p className="year">📅 {libro.year}</p>
          <p className="isbn">ISBN: {libro.isbn}</p>
          
          <p className="descripcion">{libro.description}</p>
          
          <p className="precio-grande">{libro.price}€</p>

          <div className="acciones">
            <button onClick={handleAgregarCarrito} className="btn-comprar">
              🛒 Añadir al carrito
            </button>
            <button 
              onClick={handleToggleFavorito}
              className={`btn-favorito-grande ${esFavorito(libro.id) ? 'activo' : ''}`}
            >
              {esFavorito(libro.id) ? '❤️ En favoritos' : '🤍 Añadir a favoritos'}
            </button>
          </div>

          <Link to="/catalogo" className="btn-volver">← Volver al catálogo</Link>
        </div>
      </div>

      <div className="resenas-section">
        <h2>📝 Reseñas ({resenas.length})</h2>

        <form onSubmit={handleSubmitResena} className="form-resena">
          <h3>Escribe tu reseña</h3>
          
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value={5}>⭐⭐⭐⭐⭐ Excelente</option>
            <option value={4}>⭐⭐⭐⭐ Muy bueno</option>
            <option value={3}>⭐⭐⭐ Bueno</option>
            <option value={2}>⭐⭐ Regular</option>
            <option value={1}>⭐ Malo</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escribe tu opinión sobre el libro..."
            required
            rows="4"
          />

          <button type="submit" className="btn-submit">Publicar Reseña</button>
        </form>

        <div className="lista-resenas">
          {resenas.length === 0 ? (
            <p>Aún no hay reseñas. ¡Sé el primero en opinar!</p>
          ) : (
            resenas.map(resena => (
              <div key={resena.id} className="resena-card">
                <div className="resena-header">
                  <span className="rating">{'⭐'.repeat(resena.rating)}</span>
                  <span className="fecha">{new Date(resena.date).toLocaleDateString()}</span>
                </div>
                <p className="comentario">{resena.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}