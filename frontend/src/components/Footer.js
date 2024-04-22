import React from 'react';
import '../styles/Footer.css'; // Asegúrate de importar el CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p>Modena Motors © {new Date().getFullYear()}. Todos los derechos reservados.</p>
          <p className="footer-address">123 Prestige Lane, Modena, Italia</p>
        </div>
        <div className="footer-section footer-links">
          <a href="#facebook" className="footer-link">Facebook</a>
          <a href="#twitter" className="footer-link">Twitter</a>
          <a href="#instagram" className="footer-link">Instagram</a>
        </div>
        <div className="footer-section contact-info">
          <a href="mailto:contact@modenamotors.com" className="contact-info-item">contact@modenamotors.com</a>
          <a href="tel:+1234567890" className="contact-info-item">+123 456 7890</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
