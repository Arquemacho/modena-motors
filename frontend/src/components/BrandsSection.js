import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import '../styles/BrandsSection.css';

const BrandsSection = ({ brands = []}) => {
  return (
    <div className="brands-section">
      {brands.map(brand => (
        <Fade key={brand.id} triggerOnce>
          <div className="brand-card">
            <img src={brand.logoUrl} alt={brand.name} className="brand-logo" />
            <p>{brand.description}</p>
            <Link to={`/models?brand=${brand.name}`} className="btn-view-models">Ver Modelos</Link>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default BrandsSection;
