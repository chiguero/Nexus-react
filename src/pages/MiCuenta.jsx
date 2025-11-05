import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function MiCuenta() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="mi-cuenta">
      <h1>👤 Mi Cuenta</h1>
      <p>Bienvenido, {usuario?.nombre}</p>
      <p>Email: {usuario?.email}</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
}