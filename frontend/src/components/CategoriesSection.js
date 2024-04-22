import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import '../styles/CategoriesSection.css';

const CategoriesSection = ({ categories = []}) => {
  return (
    <div className="categories-section">
      {categories.map(category => (
        <Fade key={category.id} triggerOnce>
          <div className="category-card">
            <img src={category.imageUrl} alt={category.name} className="category-image" />
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link to={`/models?category=${category.name}`} className="btn-view-category">Explorar</Link>
            </div>
          </div>
        </Fade>
      ))}
    </div>
  );
};

export default CategoriesSection;
