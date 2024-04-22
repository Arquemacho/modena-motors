import React from 'react';
import '../styles/Testimonials.css'; // Asegúrate de crear este archivo CSS

const Testimonials = ({ testimonials }) => {
    return (
        <div className="testimonials-container">
            <h2>Testimonios de Clientes</h2>
            {testimonials.map(testimonial => (
                <blockquote key={testimonial.id} className="testimonial">
                    <p>"{testimonial.quote}"</p>
                    <cite>- {testimonial.author}</cite>
                </blockquote>
            ))}
        </div>
    );
};

export default Testimonials;
