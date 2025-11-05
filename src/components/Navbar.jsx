import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

// Recibe la función para abrir el carrito como prop
export default function Navbar({ abrirCarrito }) {
  const { estaLogueado, usuario, logout } = useContext(AuthContext);
  const { modoOscuro, toggleTema } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">📚 Nexus Books</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        <Link to="/favoritos">❤️ Favoritos</Link>
        
        {estaLogueado ? (
          <>
            <Link to="/mi-cuenta">👤 {usuario?.nombre}</Link>
            {/* Botón para abrir el carrito */}
            <button onClick={abrirCarrito} className="carrito-btn">
              🛒 Carrito
            </button>
            <button onClick={logout} className="btn-logout">Salir</button>
          </>
        ) : (
          <Link to="/login" className="btn-login">Iniciar Sesión</Link>
        )}

        <button onClick={toggleTema} className="btn-theme">
          {modoOscuro ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}