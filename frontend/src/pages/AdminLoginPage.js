import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css'; // Asegúrate de importar el CSS

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para verificar la contraseña
    if (password === "passwordCorrecto") {
      navigate('/admin/dashboard'); // Redirige al panel de administrador
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleLogin}>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default AdminLogin;
