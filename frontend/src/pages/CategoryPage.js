import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CategoryPage.css'; // Asegúrate de tener este archivo

const CategoryPage = () => {
  const { category } = useParams();
  // Simular datos filtrados por categoría
  const vehicles = [{
    id: 1,
    name: "Lamborghini Aventador",
    image: "/images/aventador.jpg",
    category: "Super Autos"
  }];

  return (
    <div className="category-page">
      <h1>Vehículos en la categoría: {category}</h1>
      <div className="vehicle-gallery">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="vehicle-card">
            <img src={vehicle.image} alt={vehicle.name} />
            <h2>{vehicle.name}</h2>
            <p>{vehicle.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
