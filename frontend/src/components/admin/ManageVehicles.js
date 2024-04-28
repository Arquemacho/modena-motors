import React, { useState, useEffect } from 'react';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Aquí iría el código para obtener los vehículos del backend
    // setVehicles(fetchVehicles());
  }, []);

  // Función para añadir un nuevo vehículo
  const addVehicle = (vehicle) => {
    // Aquí se manejaría la lógica para añadir un vehículo a través de una API
  };

  // Función para eliminar un vehículo
  const deleteVehicle = (vehicleId) => {
    // Aquí se manejaría la lógica para eliminar un vehículo a través de una API
  };

  return (
    <div>
      <h1>Gestión de Vehículos</h1>
      {/* Aquí iría un formulario para añadir un nuevo vehículo */}
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          <p>{vehicle.model}</p>
          <button onClick={() => deleteVehicle(vehicle.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default ManageVehicles;
