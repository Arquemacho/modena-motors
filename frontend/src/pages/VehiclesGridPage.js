import React, { useState, useEffect, useCallback } from 'react';
import VehicleCard from '../components/VehicleCard';
import VehicleDetailsModal from '../components/VehicleDetailsModal'; // Asumiendo que has creado este componente
import '../styles/VehiclesGridPage.css';

const VehiclesGridPage = ({ location }) => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filters, setFilters] = useState({
    brand: [],
    category: [],
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: ''
  });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const urlFilters = {
          brands: queryParams.get('brands'),
          categories: queryParams.get('categories'),
          priceRange: queryParams.get('priceRange'),
          yearRange: queryParams.get('yearRange')
        };

        const response = await fetch(`http://localhost:3001/api/vehicles?${queryParams}`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setVehicles(data.vehicles);
        setFilteredVehicles(data.vehicles); // Initial filter based on URL
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, [location.search]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  // Implement infinite scroll or load more functionality here
  // For simplicity, this part is omitted

  return (
    <div>
      <h1>Galería de Vehículos</h1>
      {/* Filters and Search Components here */}
      <div className="vehicles-grid">
        {filteredVehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => openModal(vehicle)} />
        ))}
      </div>
      {showScrollButton && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="scroll-to-top">
          ↑
        </button>
      )}
      {selectedVehicle && (
        <VehicleDetailsModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}
    </div>
  );
};

export default VehiclesGridPage;
