import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import '../styles/FeaturedModels.css'; // Asegúrate de tener este archivo CSS

// Componente para renderizar cada modelo destacado
const ModelCard = ({ model }) => {
    const { imageURL, brand, model: modelName, year, description, price } = model; // Corregido para desestructurar correctamente
    return (
        <div className="model-card">
            <img src={imageURL} alt={`${brand.name} ${modelName}`} className="model-image" />
            <div className="model-details">
                <h3>{`${brand.name} ${modelName}`}</h3>
                <p>{description}</p>
                <Link to={`/vehicles/models/${model.id}`} className="model-more-info">
                    Ver Más
                </Link>
            </div>
        </div>
    );
};

const FeaturedModels = ({ models }) => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false, // Eliminamos flechas
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="featured-models-container" data-aos="fade-up">
            <h2>Modelos Destacados</h2>
            <Slider {...settings}>
                {models.map(model => (
                    <ModelCard key={model.id} model={model} />
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedModels;
