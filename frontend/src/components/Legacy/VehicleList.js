import React, { useState, useEffect } from 'react';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Asumiendo que tienes una API que devuelve los vehículos
    fetch('/api/vehicles')
      .then(response => response.json())
      .then(data => setVehicles(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="vehicle-gallery">
      {vehicles.map(vehicle => (
        <div key={vehicle.id} className="vehicle-card">
          <img src={vehicle.imageURL} alt={vehicle.model} />
          <h3>{vehicle.brand} {vehicle.model}</h3>
          <p>Año: {vehicle.year}</p>
          <p>Kilometraje: {vehicle.kilometrage}</p>
          {/* Añade más detalles según sea necesario */}
        </div>
      ))}
    </div>
  );
};

export default VehicleList;
