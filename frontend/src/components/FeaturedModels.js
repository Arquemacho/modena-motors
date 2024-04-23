import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import '../styles/FeaturedModels.css'; // Asegúrate de tener este archivo CSS

// Componente para renderizar cada modelo destacado
const ModelCard = ({ model }) => (
  <div className="model-card">
    <img src={model.imageUrl} alt={model.name} className="model-image" />
    <div className="model-details">
      <h3>{model.name}</h3>
      <p>{model.description}</p>
      <Link to={`/vehicles/models/${model.id}`} className="model-more-info">
        Ver Más
      </Link>
    </div>
  </div>
);

const FeaturedModels = ({ models }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Predeterminado para pantallas grandes
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1500, // Para pantallas de hasta 1024px de ancho
        settings: {
          slidesToShow: 2, // Mostrar 2 modelos
          slidesToScroll: 2, // Desplazar 2 modelos
        }
      },
      {
        breakpoint: 768, // Para pantallas de hasta 768px de ancho
        settings: {
          slidesToShow: 2, // Mostrar 2 modelos
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600, // Para pantallas de hasta 600px de ancho
        settings: {
          slidesToShow: 1, // Mostrar 1 modelo
          slidesToScroll: 1, // Desplazar 1 modelo
          arrows: false, // Opcionalmente, quitar flechas para pantallas pequeñas
        }
      }
      // Puedes agregar más breakpoints si es necesario
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

// Flechas personalizadas para el carrusel
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: 'block' }} // Puedes ajustar el estilo aquí
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: 'block' }} // Puedes ajustar el estilo aquí
      onClick={onClick}
    />
  );
}

export default FeaturedModels;
