import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VehicleDetails = () => {
  const [vehicle, setVehicle] = useState(null);
  const { id } = useParams(); // El ID del vehículo se obtiene de la URL

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
      .then((response) => response.json())
      .then((data) => setVehicle(data.vehicle))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  if (!vehicle) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{vehicle.brand} {vehicle.model}</h2>
      <img src={vehicle.imageURL} alt={`${vehicle.brand} ${vehicle.model}`} />
      <p><strong>Modelo:</strong> {vehicle.model}</p>
      <p><strong>Año:</strong> {vehicle.year}</p>
      <p><strong>Precio:</strong> ${vehicle.price}</p>
      <p><strong>Descripción:</strong> {vehicle.description}</p>
      {/* Agrega aquí más detalles que consideres importantes */}
    </div>
  );
};

export default VehicleDetails;
