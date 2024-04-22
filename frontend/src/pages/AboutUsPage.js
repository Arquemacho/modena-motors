import React from 'react';
import '../styles/AboutUsPage.css'; // Asegúrate de importar el CSS

const AboutUsPage = () => {
  return (
    <div className="about-us">
      <h1 className="about-title">Sobre Nosotros</h1>
      <p className="about-content">
        Modena Motors es sinónimo de excelencia en el mundo del automovilismo de lujo. 
        Con una tradición que combina pasión por el diseño y la ingeniería de precisión, 
        ofrecemos la experiencia más exclusiva para los entusiastas de los superautos.
      </p>
      <p className="about-content">
        Fundada en 1995 en el corazón de Modena, Italia, hemos crecido para ser reconocidos 
        globalmente por nuestra dedicación a la calidad y la innovación. Nuestro compromiso 
        es proporcionar no solo autos, sino experiencias inolvidables.
      </p>
      <p className="about-content">
        Nuestra sede central se encuentra en Modena, pero tenemos concesionarios y servicios 
        en varias partes del mundo, asegurando un alcance global y un servicio excepcional.
      </p>
    </div>
  );
};

export default AboutUsPage;
