import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Asegúrate de tener este archivo en la misma carpeta

const NavBar = () => {
    const brands = ["Bugatti", "Koenigsegg", "Ferrari", "Porsche", "Lamborghini", "Aston Martin", "Rolls Royce", "Bentley"];
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Modena Motors</Link>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="#" className="nav-link">Vehículos</Link>
                    <ul className="dropdown">
                        <li>
                            <Link to="#" className="dropdown-link">Categorías</Link>
                            <ul className="dropdown-submenu">
                                <li><Link to="/vehicles/category/Super Autos" className="dropdown-link-2">Super Autos</Link></li>
                                <li><Link to="/vehicles/category/Autos Deportivos" className="dropdown-link-2">Autos Deportivos</Link></li>
                                <li><Link to="/vehicles/category/Autos de Ultra Lujo" className="dropdown-link-2">Autos de Ultra Lujo</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="#" className="dropdown-link">Marcas</Link>
                            <ul className="dropdown-submenu">
                                {brands.map(brand => (
                                    <li key={brand}><Link to={`/vehicles/brand/${brand}`} className="dropdown-link-2">{brand}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li><Link to="/vehicles" className="dropdown-link">Ver Todos</Link></li>
                    </ul>
                </li>
                <li className="nav-item"><Link to="/employees" className="nav-link">Colaboradores</Link></li>
                <li className="nav-item"><Link to="/about-us" className="nav-link">Sobre Nosotros</Link></li>
            </ul>
        </nav>
    );
};

export default NavBar;
