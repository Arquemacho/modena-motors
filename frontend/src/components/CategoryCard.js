import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, imagePath, linkTo, description }) => {
    return (
        <div className="category-card" data-aos="zoom-in-up">
            <Link to={linkTo}>
                <div className="category-image-wrapper">
                    <img src={imagePath} alt={category} className="category-image" />
                </div>
                <div className="category-content">
                    <h3 className="category-name">{category}</h3>
                    <p className="category-description">{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default CategoryCard;
