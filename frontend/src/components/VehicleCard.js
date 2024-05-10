import React from 'react';
import '../styles/VehicleCard.css';

const VehicleCard = ({ vehicle, onClick }) => {
  const { imageURL, brand, model, year, description, price } = vehicle;
  const descriptionPreview = description ? `${description.substring(0, 115)}...` : "No disponible.";

  return (
    <div className="modena-vehicle-card">
      <img src={imageURL || '/path/to/default/image.jpg'} alt={`${brand ? brand.name : 'Marca Desconocida'} ${model}`} className="modena-vehicle-image" />
      <div className="modena-vehicle-details">
        <h3 className="modena-vehicle-title">{`${brand ? brand.name : 'Marca Desconocida'} ${model}`}</h3>
        <div className="modena-vehicle-year-price">
          <span className="modena-vehicle-year">{`Año: ${year}`}</span>
          <span className="modena-vehicle-price">{`$${price ? price.toLocaleString() : 'Desconocido'}`}</span>
        </div>
        <p className="modena-vehicle-description">{descriptionPreview}</p>
        <button className="modena-vehicle-more-info" onClick={() => onClick(vehicle)}>Ver Más</button>
      </div>
    </div>
  );
};

export default VehicleCard;
