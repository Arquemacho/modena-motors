// HomePage.js
import React from 'react';
import NavBar from './NavBar'; // Barra de navegación
import Carousel from './Carousel'; // Carrusel de imágenes destacadas
import Featurette from './Featurette'; // Sección de características especiales
import VehicleGallery from './VehicleGallery'; // Galería de vehículos
import AboutUs from './AboutUs'; // Sección sobre la empresa
import Footer from './Footer'; // Pie de página
import './HomePage.css'; // Estilos generales de la página de inicio

const HomePage = () => {
return (
	<div className="pagina-principal">
		<NavBar />
		<Carousel />
		<section className="seccion-introductoria">
			<h1>Bienvenidos a Modena Motors</h1>
			<p>Descubre nuestra gama exclusiva de superdeportivos y vehículos de lujo.</p>
		</section>
		{/* <VehicleGallery /> */}
		<Featurette />
		<section className="seccion-experiencia">
			<h2>Experimenta la Excelencia</h2>
			<p>Únete a nosotros para sentir la adrenalina con nuestros expertos. Reserva tu experiencia hoy mismo.</p>
			<button className="btn boton-experiencia">Reservar Cita</button>
		</section>
		<AboutUs />
		<Footer />
	</div>
);
};

export default HomePage;
