// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Importa los estilos personalizados para NavBar

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" className="nav-link logo">Modena Motors</Link>
      </div>
      <div className="nav-links">
        <Link to="/colecciones" className="nav-link">Colecciones</Link>
        <Link to="/experiencias" className="nav-link">Experiencias</Link>
        <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>
        <Link to="/login" className="nav-link">Iniciar Sesión</Link>
        <Link to="/registro" className="nav-link">Registrarse</Link>
      </div>
    </nav>
  );
};

export default NavBar;
