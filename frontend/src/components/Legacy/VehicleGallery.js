import React from 'react';
import './VehicleGallery.css'; // Importa los estilos personalizados para VehicleGallery

// Esta es una estructura de datos de ejemplo, reemplázala con la tuya.
const vehicles = [
  {
    id: 1,
    name: 'Modelo X',
    image: '/path/to/image.jpg', // Asegúrate de que esta ruta sea correcta.
    description: 'Descripción breve del vehículo.'
  },
  // ...más vehículos
];

const VehicleGallery = () => {
  return (
    <div className="vehicle-gallery">
      {vehicles.map((vehicle) => (
        <div className="vehicle-item" key={vehicle.id}>
          <img src={vehicle.image} alt={vehicle.name} className="vehicle-image" />
          <h3 className="vehicle-name">{vehicle.name}</h3>
          <p className="vehicle-description">{vehicle.description}</p>
          {/* Agrega más detalles que desees mostrar */}
        </div>
      ))}
    </div>
  );
};

export default VehicleGallery;
