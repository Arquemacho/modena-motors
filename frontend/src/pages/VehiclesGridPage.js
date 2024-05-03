import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import '../styles/VehiclesGridPage.css';

const VehiclesGridPage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/vehicles');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setVehicles(data.vehicles);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div>
      <h1>Galería de Vehículos</h1>
      <div className="vehicles-grid">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehiclesGridPage;
