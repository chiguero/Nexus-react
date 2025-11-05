import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import { AuthContext } from '../context/AuthContext';
import { RutaPrivada } from '../components/RutaPrivada';
import { obtenerPortada } from '../config/imagenesPortadas';  // ← IMPORTAR

function CheckoutContent() {
  const { carrito, totalPrecio, vaciarCarrito } = useCarrito();
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    email: usuario?.email || '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    tarjeta: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Pedido realizado con éxito! 🎉');
    vaciarCarrito();
    navigate('/mi-cuenta');
  };

  if (carrito.length === 0) {
    return (
      <div className="checkout-vacio">
        <h1>Tu carrito está vacío</h1>
        <button onClick={() => navigate('/catalogo')}>
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="checkout">
      <h1>💳 Finalizar Compra</h1>

      <div className="checkout-contenido">
        {/* Resumen del pedido */}
        <div className="resumen-pedido">
          <h2>Resumen del Pedido</h2>
          
          {carrito.map(item => {
            // ← USAR obtenerPortada AQUÍ
            const imagenPortada = obtenerPortada(item.id, item.coverImage);
            
            return (
              <div key={item.id} className="item-resumen">
                <img src={imagenPortada} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <p>Cantidad: {item.cantidad}</p>
                </div>
                <p className="precio">{(item.price * item.cantidad).toFixed(2)}€</p>
              </div>
            );
          })}

          <div className="total-resumen">
            <strong>Total:</strong>
            <strong>{totalPrecio.toFixed(2)}€</strong>
          </div>
        </div>

        {/* Formulario de pago */}
        <div className="formulario-pago">
          <h2>Datos de Envío</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              required
            />

            <div className="fila-dos">
              <input
                type="text"
                name="ciudad"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="codigoPostal"
                placeholder="Código Postal"
                value={formData.codigoPostal}
                onChange={handleChange}
                required
              />
            </div>

            <h3>Método de Pago</h3>

            <input
              type="text"
              name="tarjeta"
              placeholder="Número de tarjeta"
              value={formData.tarjeta}
              onChange={handleChange}
              required
              maxLength="16"
            />

            <button type="submit" className="btn-pagar">
              Realizar Pedido - {totalPrecio.toFixed(2)}€
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Checkout() {
  return (
    <RutaPrivada>
      <CheckoutContent />
    </RutaPrivada>
  );
}