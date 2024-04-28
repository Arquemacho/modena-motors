import React from 'react';
import { Link } from 'react-router-dom'; // Agrega esta línea
import '../styles/Footer.css'; // Importar el CSS actualizado

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <span className="footer-logo">Modena Motors</span>
          <p>Modena Motors © {year}. Todos los derechos reservados.</p>
          <p className="footer-address">123 Prestige Lane, Modena, Italia</p>
        </div>
        <div className="footer-section footer-links">
          <a href="https://facebook.com" className="footer-link" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className="footer-section contact-info">
          <a href="mailto:contact@modenamotors.com" className="contact-info-item">contact@modenamotors.com</a><a></a>
          <a href="tel:+1234567890" className="contact-info-item">+123 456 7890</a>
        </div>
		<div className="footer-section admin-login">
          <Link to="/admin" className="footer-link">
            Consola de Administrador
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
