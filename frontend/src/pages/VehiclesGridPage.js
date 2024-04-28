import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard'; // Asegúrate de tener este componente

const VehiclesGridPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Aquí iría el código para obtener los vehículos del backend
    // setVehicles(fetchVehicles());
  }, []);

  return (
    <div>
      <h1>Galería de Vehículos</h1>
      <div className="vehicles-grid">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehiclesGridPage;
