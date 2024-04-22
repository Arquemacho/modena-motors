import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/CarCarousel.css';

const CarCarousel = ({ cars }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    if (!cars || cars.length === 0) {
        return <div className="carousel-empty">No cars available</div>;
    }

    return (
        <div className="car-carousel">
            <Slider {...settings}>
                {cars.map(car => (
                    <div key={car.id} className="car-slide">
                        <img src={car.imageUrl} alt={car.name} />
                        <div className="car-info">
                            <h3>{car.name}</h3>
                            <p>{car.description || 'No description available'}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarCarousel;
