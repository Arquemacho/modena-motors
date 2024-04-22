import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, imagePath, linkTo, index }) => {
  const isReversed = index % 2 !== 0;

  return (
    <div className={`category-card ${isReversed ? 'reversed' : ''}`} data-aos="fade-up">
      <div className="category-image-content" style={{ backgroundImage: `url(${imagePath})` }}>
        {/* Imagen de fondo con efecto de desvanecimiento */}
      </div>
      <div className="category-details">
        <h3 className="category-title">{category}</h3>
        <p className="category-description">Explora nuestra selección exclusiva de {category.toLowerCase()}.</p>
        <Link to={linkTo} className="category-button">Ver Más</Link>
      </div>
    </div>
  );
};

export default CategoryCard;
