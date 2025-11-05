import { useCarrito } from '../hooks/useCarrito';
import { Link } from 'react-router-dom';
import { obtenerPortada } from '../config/imagenesPortadas';  // ← IMPORTAR

export default function Carrito({ mostrar, cerrar }) {
  const { 
    carrito, 
    eliminarDelCarrito, 
    actualizarCantidad, 
    totalPrecio 
  } = useCarrito();

  if (!mostrar) return null;

  return (
    <>
      <div className="carrito-overlay" onClick={cerrar}></div>
      
      <div className="carrito-sidebar">
        <div className="carrito-header">
          <h2>🛒 Carrito de Compras</h2>
          <button onClick={cerrar} className="btn-cerrar">✕</button>
        </div>

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <p>Tu carrito está vacío</p>
            <Link to="/catalogo" onClick={cerrar}>Explorar libros</Link>
          </div>
        ) : (
          <>
            <div className="carrito-items">
              {carrito.map(item => {
                // ← USAR obtenerPortada AQUÍ
                const imagenPortada = obtenerPortada(item.id, item.coverImage);
                
                return (
                  <div key={item.id} className="carrito-item">
                    <img src={imagenPortada} alt={item.title} />
                    
                    <div className="item-info">
                      <h4>{item.title}</h4>
                      <p className="autor">{item.author.name}</p>
                      <p className="precio">{item.price}€</p>
                    </div>

                    <div className="item-cantidad">
                      <button 
                        onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      >
                        −
                      </button>
                      <span>{item.cantidad}</span>
                      <button 
                        onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="btn-eliminar"
                      aria-label="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="carrito-footer">
              <div className="total">
                <span>Total:</span>
                <span className="total-precio">{totalPrecio.toFixed(2)}€</span>
              </div>
              <Link 
                to="/checkout" 
                onClick={cerrar} 
                className="btn-checkout"
              >
                Proceder al Pago
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}