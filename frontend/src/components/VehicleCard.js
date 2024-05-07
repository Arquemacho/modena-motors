import React from 'react';
import '../styles/VehicleCard.css';

const VehicleCard = ({ vehicle }) => {
  const { imageURL, brand, model, year, description, price } = vehicle;

  return (
    <div className="vehicle-card">
      <img src={imageURL || '/path/to/default/image.jpg'} alt={`${brand ? brand.name : 'Marca Desconocida'} ${model}`} className="vehicle-image" />
      <div className="vehicle-details">
        <h3 className="vehicle-title">{`${brand ? brand.name : 'Marca Desconocida'} ${model}`}</h3>
        <p className="vehicle-year">{year}</p>
        <p className="vehicle-price">{`Precio: $${price ? price.toLocaleString() : 'Desconocido'}`}</p>
        <p className="vehicle-description">{description}</p>
        <button className="vehicle-more-info">Ver Más</button>
      </div>
    </div>
  );
};

export default VehicleCard;
