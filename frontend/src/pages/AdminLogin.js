import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Guardar el token en localStorage
        setAuthData(data.token);
        navigate('/admin-panel');
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      setError('No se pudo conectar al servidor');
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <h1>Iniciar Sesión como Administrador</h1>
        <label>Usuario:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Iniciar Sesión</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;
