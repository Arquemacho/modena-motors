import React, { useState, useEffect } from 'react';
import VehicleCard from '../components/VehicleCard';
import '../styles/ModelsPage.css'; // Asegúrate de tener este archivo CSS

const ModelsPage = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        // Aquí iría la lógica para cargar los vehículos desde una API o fuente de datos
    }, []);

    return (
        <div className="models-page">
            <h1>Nuestros Modelos</h1>
            <div className="vehicle-list">
                {vehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
            </div>
        </div>
    );
};

export default ModelsPage;
