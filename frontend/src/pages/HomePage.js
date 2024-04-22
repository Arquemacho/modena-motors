import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCarousel from '../components/CarCarousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';

const HomePage = () => {
    const [cars, setCars] = useState([
        { id: 1, imageUrl: "/path-to-image-1.jpg", name: "Car 1" },
        { id: 2, imageUrl: "/path-to-image-2.jpg", name: "Car 2" },
        // Continúa agregando más coches aquí
    ]);

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true,
        });
    }, []);

    return (
        <main className="homepage">
            <section className="hero" data-aos="fade-right">
                <div className="text-container">
                    <h1>Bienvenido a Modena Motors</h1>
                    <p>Explora nuestra exclusiva colección de super autos, autos deportivos, y autos de ultra lujo.</p>
                </div>
                <Link to="/vehicles" className="btn-primary">Descubre Nuestros Modelos</Link>
                <div className="scroll-down">&#x2193;</div>
            </section>
            <CarCarousel cars={cars} />
            <section className="featured-section" data-aos="fade-up">
                <h2>Modelos Destacados</h2>
                {/* Componente o contenido para modelos destacados */}
            </section>
            <section className="explore-section" data-aos="zoom-in">
                <Link to="/vehicles/category/SuperAutos" className="explore-link">Explora Super Autos</Link>
                <Link to="/vehicles/category/Deportivos" className="explore-link">Explora Autos Deportivos</Link>
                <Link to="/vehicles/category/UltraLujo" className="explore-link">Explora Autos de Ultra Lujo</Link>
            </section>
            {/* Secciones adicionales como testimonios, lanzamientos y más */}
        </main>
    );
};

export default HomePage;
