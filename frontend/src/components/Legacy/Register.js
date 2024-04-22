import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    // Añade más campos según sea necesario
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí implementarías la lógica para registrar al usuario
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de usuario:
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
      </label>
      <label>
        Contraseña:
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
      </label>
      <label>
        Confirmar Contraseña:
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      </label>
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Register;
