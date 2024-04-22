import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/VehiclesPage.css'; // Asegúrate de tener este archivo

const VehiclesPage = () => {
  // Simulando una carga de datos
  const vehicles = [{
    id: 1,
    name: "Bugatti Chiron",
    image: "/images/chiron.jpg",
    category: "Super Autos"
  }, {
    id: 2,
    name: "Ferrari F8",
    image: "/images/f8.jpg",
    category: "Deportivos"
  }];

  return (
    <div className="vehicles-page">
      <h1>Nuestros Vehículos</h1>
      <div className="vehicle-gallery">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="vehicle-card">
            <img src={vehicle.image} alt={vehicle.name} />
            <h2>{vehicle.name}</h2>
            <p>Categoría: {vehicle.category}</p>
            <Link to={`/vehicle/${vehicle.id}`} className="view-details">Ver Detalles</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;
