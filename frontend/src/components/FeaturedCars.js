import React from 'react';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom'; // Agrega esta línea
import '../styles/FeaturedCars.css';

const FeaturedCars = ({ featuredCars = []}) => {
  return (
    <div className="featured-cars-container">
      {featuredCars.map(car => (
        <Fade key={car.id} triggerOnce>
          <div className="car-card">
            <img src={car.imageUrl} alt={car.model} className="car-image" />
            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>
              <Link to={`/models/${car.id}`} className="btn-view-details">Ver Detalles</Link>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default FeaturedCars;
