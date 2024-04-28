import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VehicleDetailsPage = () => {
  const { vehicleId } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    // Aquí iría el código para obtener los detalles de un vehículo específico del backend
    // setVehicle(fetchVehicleDetails(vehicleId));
  }, [vehicleId]);

  if (!vehicle) {
    return <div>Cargando detalles del vehículo...</div>;
  }

  return (
    <div>
      <h1>Detalles del Vehículo</h1>
      <div>
        <h2>{vehicle.model}</h2>
        {/* Añadir aquí más detalles como imágenes, descripción, etc. */}
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
