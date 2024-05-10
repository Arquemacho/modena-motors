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
		slidesToShow: 3, // Muestra 3 testimonios a la vez
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
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
