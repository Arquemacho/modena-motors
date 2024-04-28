import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCarousel from '../components/CarCarousel';
import FeaturedModels from '../components/FeaturedModels';
import Testimonials from '../components/Testimonials';
import LaunchAnnouncements from '../components/LaunchAnnouncements';
import CategoryCard from '../components/CategoryCard'; 
import BrandsSection from '../components/BrandsSection';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/HomePage.css';

const HomePage = () => {
    const [cars, setCars] = useState([
        { id: 1, imageUrl: '/images/models/car2.jpg', name: "Car 1" },
        { id: 2, imageUrl: '/images/models/car1.jpg', name: "Car 2" },
        // Añade más coches aquí
    ]);

    const brands = [
        // Asumiendo que tienes imágenes para cada marca en tu carpeta public/images
        { name: 'Bugatti', imagePath: '/images/brands/bugatti.jpg' },
        { name: 'Ferrari', imagePath: '/images/brands/ferrari.jpg' },
        // Agrega aquí más marcas
    ];

    const categories = [
        { name: 'Super Autos', imagePath: '/images/models/car1.jpg', linkTo: '/vehicles/category/SuperAutos' },
        { name: 'Autos Deportivos', imagePath: '/images/models/car2.jpg', linkTo: '/vehicles/category/Deportivos' },
        { name: 'Autos de Ultra Lujo', imagePath: '/images/models/car3.jpg', linkTo: '/vehicles/category/UltraLujo' },
    ];


    const [featuredModels, setFeaturedModels] = useState([
        // Dummy data for featured models
        { id: 1, imageUrl: '/images/hero.jpg', name: "Model 1", description: "Description 1" },
        { id: 2, imageUrl: "/images/hero.jpg", name: "Model 2", description: "Description 2" }
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
				<h1 data-aos="zoom-in" data-aos-delay="500">Bienvenido a Modena Motors</h1>
                <p data-aos="zoom-in" data-aos-delay="500">Explora nuestra exclusiva colección de super autos, autos deportivos, y autos de ultra lujo.</p>
                <div className="scroll-down" onClick={handleScroll}>&#x2193;</div>
            </section>
            {/*<CarCarousel cars={cars} */}
            <FeaturedModels models={featuredModels} />
            <section className="category-section" data-aos="fade-up">
                <h2>Explora por Categorías</h2>
                <div className="category-list">
                  {categories.map((category, index) => (
                    <CategoryCard
                      key={category.name}
                      category={category.name}
                      imagePath={category.imagePath}
                      linkTo={category.linkTo}
                      index={index} // Pasar el índice aquí
                    />
                  ))}
                </div>
            </section>
            <BrandsSection brands={brands} />
            <Testimonials testimonials={testimonials}/>
            <LaunchAnnouncements announcements={launches}/>
            <div className="full-catalogue-link" data-aos="zoom-in">
                <Link to="/vehicles/all" className="explore-all-button">Explora Todos Nuestros Modelos</Link>
            </div>
        </main>
    );
};

export default HomePage;
