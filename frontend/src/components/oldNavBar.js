import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Asegúrate de tener este archivo en la misma carpeta

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Modena Motors</Link>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="#" className="nav-link">Vehículos</Link>
          <ul className="dropdown">
            <li><Link to="#" className="dropdown-link">Categorías</Link>
              <ul className="dropdown-submenu">
                <li><Link to="/vehicles/category/SuperAutos">Super Autos</Link></li>
                <li><Link to="/vehicles/category/Deportivos">Autos Deportivos</Link></li>
                <li><Link to="/vehicles/category/UltraLujo">Autos de Ultra Lujo</Link></li>
              </ul>
            </li>
            <li><Link to="#" className="dropdown-link">Marcas</Link>
              <ul className="dropdown-submenu">
                <li><Link to="/vehicles/brand/Bugatti">Bugatti</Link></li>
                <li><Link to="/vehicles/brand/Koenigsegg">Koenigsegg</Link></li>
                <li><Link to="/vehicles/brand/Ferrari">Ferrari</Link></li>
                <li><Link to="/vehicles/brand/Porsche">Porsche</Link></li>
              </ul>
            </li>
            <li><Link to="/vehicles" className="dropdown-link">Ver Todos</Link></li>
          </ul>
        </li>
        <li className="nav-item"><Link to="/employees" className="nav-link">Colaboradores</Link></li>
        <li className="nav-item"><Link to="/about-us" className="nav-link">Sobre Nosotros</Link></li>
        {/* Agrega cualquier otro enlace relevante aquí */}
      </ul>
    </nav>
  );
};

export default NavBar;
