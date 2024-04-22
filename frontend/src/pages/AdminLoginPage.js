import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLoginPage.css'; // Asegúrate de tener este archivo CSS

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí iría la lógica de autenticación
    if (password === "admin") { // Simulación de contraseña correcta
      navigate('/admin-panel');
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <div className="admin-login-page">
      <form onSubmit={handleLogin}>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Introduce tu contraseña"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
