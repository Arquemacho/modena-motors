import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/Testimonials.css';

const Testimonials = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="testimonials-container">
      <h2>Testimonios de Clientes</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <blockquote key={testimonial.id} className="testimonial">
            <p>"{testimonial.quote}"</p>
            <cite>- {testimonial.author}</cite>
          </blockquote>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;
