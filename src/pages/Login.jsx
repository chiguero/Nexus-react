import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuario = {
      email,
      nombre: email.split('@')[0] // Nombre del email
    };
    
    login(usuario);
    
    // Redirigir a donde quería ir o a mi-cuenta por defecto
    const from = location.state?.from?.pathname || '/mi-cuenta';
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <h1>🔐 Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#64748b' }}>
        💡 Usa cualquier email para probar
      </p>
    </div>
  );
}