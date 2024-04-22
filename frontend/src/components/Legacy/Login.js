import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Solo necesitas useNavigate
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate(); // Usas navigate para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Asumiendo que authContext tiene un método 'login' para autenticar al usuario
    const success = await authContext.login(username, password);
    if (success) {
      navigate('/admin'); // Correctamente usas navigate aquí
    } else {
      // Manejo de errores, mostrar un mensaje de error, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Usuario:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Contraseña:
        <input 
          type={showPassword ? "text" : "password"} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </label>
      <label>
        Mostrar Contraseña:
        <input 
          type="checkbox" 
          checked={showPassword}
          onChange={(e) => setShowPassword(e.target.checked)}
        />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;
