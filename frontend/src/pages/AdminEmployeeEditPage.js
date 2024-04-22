import React, { useState } from 'react';
import '../styles/AdminEmployeeEditPage.css'; // Asegúrate de tener este archivo CSS

const AdminEmployeeEditPage = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    position: "",
    years: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se manejaría la lógica para enviar los datos al servidor
    console.log(employeeData);
  };

  return (
    <div className="admin-employee-edit-page">
      <h1>Editar Empleado</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={employeeData.name}
          onChange={handleChange}
        />
        <label>Cargo:</label>
        <input
          type="text"
          name="position"
          value={employeeData.position}
          onChange={handleChange}
        />
        <label>Años en la empresa:</label>
        <input
          type="number"
          name="years"
          value={employeeData.years}
          onChange={handleChange}
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default AdminEmployeeEditPage;
