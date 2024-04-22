import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/FeaturedModels.css';

const FeaturedModels = ({ models }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (!models || models.length === 0) {
        return <div>No featured models available</div>;
    }

    return (
        <div className="featured-models">
            <Slider {...settings}>
                {models.map(model => (
                    <div key={model.id} className="model-slide">
                        <img src={model.imageUrl} alt={model.name} className="model-image" />
                        <div className="model-info">
                            <h3>{model.name}</h3>
                            <p>{model.description}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default FeaturedModels;
