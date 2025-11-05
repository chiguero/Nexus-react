import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function RutaPrivada({ children }) {
  const { estaLogueado } = useContext(AuthContext);
  const location = useLocation();
  
  if (!estaLogueado) {
    // Guardar la ruta a la que quería ir
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}