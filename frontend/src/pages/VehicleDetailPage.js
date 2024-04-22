import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/VehicleDetailPage.css'; // Asegúrate de tener este archivo

const VehicleDetailPage = () => {
  const { vehicleId } = useParams();
  // Simulación de datos de un vehículo específico
  const vehicle = {
    id: vehicleId,
    name: "Aston Martin DB11",
    images: ["/images/db11.jpg"],
    description: "Un clásico moderno con un rendimiento impresionante.",
    price: "350,000 USD",
    year: 2021,
    mileage: "5,000 km"
  };

  return (
    <div className="vehicle-detail-page">
      <h1>{vehicle.name}</h1>
      <div className="vehicle-images">
        {vehicle.images.map((image, index) => (
          <img key={index} src={image} alt={vehicle.name} />
        ))}
      </div>
      <p>{vehicle.description}</p>
      <ul>
        <li>Precio: {vehicle.price}</li>
        <li>Año: {vehicle.year}</li>
        <li>Kilometraje: {vehicle.mileage}</li>
      </ul>
    </div>
  );
};

export default VehicleDetailPage;
