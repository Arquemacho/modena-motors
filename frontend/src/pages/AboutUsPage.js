import React from 'react';
import '../styles/AboutUsPage.css'; // Asegúrate de importar el CSS

const AboutUsPage = () => {
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
          <img src="/images/about-history.jpg" alt="Our History" className="about-image"/>
        </section>
        <section className="about-section">
          <h2 className="section-title">Innovación y Calidad</h2>
          <p>
            Nos comprometemos a proporcionar no solo autos, sino experiencias inolvidables que combinan 
            lujo y rendimiento sin precedentes. Cada vehículo es un testimonio de nuestra búsqueda constante 
            por la innovación y la excelencia en automoción.
          </p>
          <img src="/images/about-innovation.jpg" alt="Innovation and Quality" className="about-image"/>
        </section>
        <section className="about-section">
          <h2 className="section-title">Presencia Global</h2>
          <p>
            Con sede central en Modena y concesionarios en todo el mundo, nuestra red global garantiza 
            un servicio excepcional y accesibilidad para todos nuestros clientes, independientemente 
            de donde se encuentren.
          </p>
          <img src="/images/about-global.jpg" alt="Global Presence" className="about-image"/>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
