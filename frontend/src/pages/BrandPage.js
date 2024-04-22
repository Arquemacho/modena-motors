import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BrandPage.css'; // Asegúrate de tener este archivo

const BrandPage = () => {
  const { brand } = useParams();
  // Datos simulados para la marca
  const vehicles = [{
    id: 1,
    name: "Porsche 911",
    image: "/images/porsche911.jpg",
    category: "Deportivos"
  }];

  return (
    <div className="brand-page">
      <h1>Modelos de {brand}</h1>
      <div className="vehicle-gallery">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="vehicle-card">
            <img src={vehicle.image} alt={vehicle.name} />
            <h2>{vehicle.name}</h2>
            <p>Categoría: {vehicle.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
