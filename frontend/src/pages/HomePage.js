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
        { name: 'Bugatti', imagePath: '/images/brands/bugatti.png' },
        { name: 'Koenigsegg', imagePath: '/images/brands/koenigsegg.png' },
        { name: 'Ferrari', imagePath: '/images/brands/ferrari.png' },
        { name: 'Porsche', imagePath: '/images/brands/porsche.png' },
        { name: 'Lamborghini', imagePath: '/images/brands/lamborghini.png' },
        { name: 'Aston Martin', imagePath: '/images/brands/astonmartin.png' },
        { name: 'Rolls Royce', imagePath: '/images/brands/rollsroyce.png' },
        { name: 'Bentley', imagePath: '/images/brands/bentley.png' },
        // Agrega aquí más marcas si necesario
    ];

    const categories = [
        { name: 'Super Autos', imagePath: '/images/models/car1.jpg', linkTo: '/vehicles/category/SuperAutos' },
        { name: 'Autos Deportivos', imagePath: '/images/models/car2.jpg', linkTo: '/vehicles/category/Deportivos' },
        { name: 'Autos de Ultra Lujo', imagePath: '/images/models/car3.jpg', linkTo: '/vehicles/category/UltraLujo' },
    ];


    const [featuredModels, setFeaturedModels] = useState([]);

    useEffect(() => {
        const fetchFeaturedModels = async () => {
            try {
                const vehicleResponse = await fetch('http://localhost:3001/api/vehicles');
                const brandResponse = await fetch('http://localhost:3001/api/brands');
                const categoryResponse = await fetch('http://localhost:3001/api/categories');

                if (!vehicleResponse.ok || !brandResponse.ok || !categoryResponse.ok) throw new Error('Failed to fetch');

                const vehicleData = await vehicleResponse.json();
                const brandsData = await brandResponse.json();
                const categoriesData = await categoryResponse.json();

                const brandsMap = brandsData.brands.reduce((acc, brand) => ({ ...acc, [brand.id]: brand }), {});
                const categoriesMap = categoriesData.categories.reduce((acc, category) => ({ ...acc, [category.id]: category }), {});

                const enrichedVehicles = vehicleData.vehicles.map(vehicle => ({
                    ...vehicle,
                    brand: brandsMap[vehicle.brand_id],
                    category: categoriesMap[vehicle.category_id]
                }));

                setFeaturedModels(enrichedVehicles);
            } catch (error) {
                console.error('Error fetching featured models:', error);
            }
        };

        fetchFeaturedModels();
    }, []);


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
            <div className="brands-section">
                {brands.map(brand => (
                    <div key={brand.name} className="brand-card">
                        <img src={brand.imagePath} alt={brand.name} className="brand-logo" />
                        <Link to={`/vehicles/brand/${brand.name}`} className="brand-link">Explora {brand.name}</Link>
                    </div>
                ))}
            </div>
            <Testimonials testimonials={testimonials}/>
            <LaunchAnnouncements announcements={launches}/>
            <div className="full-catalogue-link" data-aos="zoom-in">
                <Link to="/vehicles/" className="explore-all-button">Explora Todos Nuestros Modelos</Link>
            </div>
        </main>
    );
};

export default HomePage;
