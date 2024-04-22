import React from 'react';
import './Carousel.css'; // Asegúrate de que el CSS esté correctamente vinculado

const Carousel = () => {
  // Array de imágenes para el carrusel.
  const images = [
    // Asegúrate de que estas rutas correspondan a donde están almacenadas tus imágenes.
    "/images/cars/car1.jpg",
    "/images/cars/car2.jpg",
    "/images/cars/car3.jpg",
  ];

  return (
    <div className="carousel">
      {images.map((image, index) => (
        <div className="carousel-slide" key={index}>
          <img src={image} alt={`Car ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
