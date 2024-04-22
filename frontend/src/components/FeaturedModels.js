import React from 'react';
import '../styles/FeaturedModels.css'; // Asegúrate de tener este archivo CSS

const FeaturedModels = ({ models }) => {
    return (
        <div className="featured-models-container" data-aos="fade-up">
            <h2>Modelos Destacados</h2>
            <div className="models-grid">
                {models.map(model => (
                    <div key={model.id} className="model-card">
                        <img src={model.imageUrl} alt={model.name} className="model-image" />
                        <div className="model-details">
                            <h3>{model.name}</h3>
                            <p>{model.description}</p>
                            {/* Agrega más detalles aquí si es necesario */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedModels;
