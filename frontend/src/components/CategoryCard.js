import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category, imagePath, linkTo }) => {
    return (
        <div className="category-card">
            <Link to={linkTo}>
                <img src={imagePath} alt={category} className="category-image" />
                <div className="category-name">{category}</div>
            </Link>
        </div>
    );
};

export default CategoryCard;
