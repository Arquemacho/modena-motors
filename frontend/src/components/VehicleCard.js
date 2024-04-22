import React from 'react';
import '../styles/VehicleCard.css'; // Asegúrate de importar el CSS

const VehicleCard = ({ image, brand, model, year, mileage }) => {
  return (
    <div className="vehicle-card">
      <img src={image} alt={`${brand} ${model}`} className="vehicle-image" />
      <div className="vehicle-details">
        <h3 className="vehicle-title">{`${brand} ${model}`}</h3>
        <p className="vehicle-year">{year}</p>
        <p className="vehicle-mileage">{`${mileage} km`}</p>
      </div>
    </div>
  );
};

export default VehicleCard;
