import React, { useState } from 'react';
import '../styles/AdminVehicleEditPage.css'; // Asegúrate de tener este archivo CSS

const AdminVehicleEditPage = () => {
  const [vehicleData, setVehicleData] = useState({
    name: "",
    price: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setVehicleData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se manejaría la lógica para enviar los datos al servidor
    console.log(vehicleData);
  };

  return (
    <div className="admin-vehicle-edit-page">
      <h1>Editar Vehículo</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={vehicleData.name}
          onChange={handleChange}
        />
        <label>Precio:</label>
        <input
          type="text"
          name="price"
          value={vehicleData.price}
          onChange={handleChange}
        />
        <label>Descripción:</label>
        <textarea
          name="description"
          value={vehicleData.description}
          onChange={handleChange}
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default AdminVehicleEditPage;
