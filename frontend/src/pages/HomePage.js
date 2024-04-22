import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCarousel from '../components/CarCarousel';
import FeaturedModels from '../components/FeaturedModels';
import Testimonials from '../components/Testimonials';
import LaunchAnnouncements from '../components/LaunchAnnouncements';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';

const HomePage = () => {
    const [cars, setCars] = useState([
        { id: 1, imageUrl: '../../public/images/hero.jpg', name: "Car 1" },
        { id: 2, imageUrl: '../../public/images/hero.jpg', name: "Car 2" },
        // Continúa agregando más coches aquí
    ]);

    const [featuredModels, setFeaturedModels] = useState([
        // Dummy data for featured models
        { id: 1, imageUrl: '../../public/images/hero.jpg', name: "Model 1", description: "Description 1" },
        { id: 2, imageUrl: '../../public/images/hero.jpg', name: "Model 2", description: "Description 2" }
    ]);

    const [testimonials, setTestimonials] = useState([
        // Dummy data for testimonials
        { id: 1, quote: "Best car purchase experience ever!", author: "John Doe" },
        { id: 2, quote: "A truly premium service.", author: "Jane Smith" }
    ]);

    const [launches, setLaunches] = useState([
        // Dummy data for launch announcements
        { id: 1, title: "Model X Launch", description: "Join us for the launch of our new supercar model X." }
    ]);

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: true,
        });
    }, []);

    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        });
    };

    return (
        <main className="homepage">
            <section className="hero" data-aos="fade-right">
                <h1>Bienvenido a Modena Motors</h1>
                <p>Explora nuestra exclusiva colección de super autos, autos deportivos, y autos de ultra lujo.</p>
                <div className="scroll-down" onClick={handleScroll}>&#x2193;</div>
            </section>
            <CarCarousel cars={cars} />
            <FeaturedModels models={featuredModels} />
            <section className="featured-section" data-aos="fade-up">
                <h2>Modelos Destacados</h2>
            </section>
            <section className="explore-section" data-aos="zoom-in">
                <Link to="/vehicles/category/SuperAutos" className="explore-link">Explora Super Autos</Link>
                <Link to="/vehicles/category/Deportivos" className="explore-link">Explora Autos Deportivos</Link>
                <Link to="/vehicles/category/UltraLujo" className="explore-link">Explora Autos de Ultra Lujo</Link>
            </section>
            <Testimonials testimonials={testimonials} />
            <LaunchAnnouncements announcements={launches} />
            <div className="full-catalogue-link">
                <Link to="/vehicles/all" className="explore-all-button">Explora Todos Nuestros Modelos</Link>
            </div>
        </main>
    );
};

export default HomePage;
