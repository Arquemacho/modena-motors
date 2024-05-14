import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/AboutUsPage.css';
import Confetti from 'react-confetti';

const AboutUsPage = () => {
  const location = useLocation();
  const defaultMessage = location.state?.message || '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: defaultMessage,
    phone: ''
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://186.113.234.239:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessageSent(true);
        setFormData({ name: '', email: '', message: '', phone: '' });
      } else {
        const errorText = await response.text();
        alert(`Error al enviar mensaje: ${errorText}`);
      }
    } catch (error) {
      console.error('Error enviando el formulario:', error);
      alert('Error al enviar el mensaje. Inténtalo de nuevo.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="about-us">
      <section className="about-header">
        <h1 className="about-title">Sobre Nosotros</h1>
        <p className="about-subtitle">
          Experiencia y pasión en cada detalle.
        </p>
      </section>
      <div className="about-content">
        <section className="about-section">
          <h2 className="section-title">Nuestra Historia</h2>
          <p>
            Fundada en 1995 en el corazón de Modena, Italia, Modena Motors se ha destacado por su pasión 
            por el diseño de vanguardia y la ingeniería de precisión, ofreciendo experiencias exclusivas 
            a los entusiastas de los superautos alrededor del mundo.
          </p>
        </section>
        <section className="about-section">
          <h2 className="section-title">Innovación y Calidad</h2>
          <p>
            Nos comprometemos a proporcionar no solo autos, sino experiencias inolvidables que combinan 
            lujo y rendimiento sin precedentes. Cada vehículo es un testimonio de nuestra búsqueda constante 
            por la innovación y la excelencia en automoción.
          </p>
        </section>
        <section className="about-section">
          <h2 className="section-title">Presencia Global</h2>
          <p>
            Con sede central en Modena y concesionarios en todo el mundo, nuestra red global garantiza 
            un servicio excepcional y accesibilidad para todos nuestros clientes, independientemente 
            de donde se encuentren.
          </p>
        </section>
      </div>
      <section className="contact-section">
        <h2 className="section-title">Contacto</h2>
        {messageSent ? (
        <>
          <Confetti />
          <h1>Mensaje Enviado</h1>
          <p>¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.</p>
        </>
      ) : (
        <>
          <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Tu correo electrónico" value={formData.email} onChange={handleChange} required />
          <input type="text" name="phone" placeholder="Tu teléfono" value={formData.phone} onChange={handleChange} required />
          <textarea name="message" placeholder="Tu mensaje" value={formData.message} onChange={handleChange} required />
          <button type="submit">Enviar Mensaje</button>
        </form>
        </>
      )}
        
      </section>
    </div>
  );
};

export default AboutUsPage;
