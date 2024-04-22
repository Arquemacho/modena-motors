import React from 'react';
import '../styles/Testimonials.css';

const Testimonials = ({ testimonials }) => {
    return (
        <div className="testimonials">
            {testimonials.map(testimonial => (
                <div key={testimonial.id} className="testimonial">
                    <blockquote>{testimonial.quote}</blockquote>
                    <cite>- {testimonial.author}</cite>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;
