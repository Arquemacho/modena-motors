import React, { useState, useEffect, useRef } from 'react';
import VehicleCard from '../components/VehicleCard';
import VehicleDetailsModal from '../components/VehicleDetailsModal';
import '../styles/VehiclesGridPage.css';

const VehiclesGridPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  useEffect(() => {
  const fetchVehicles = async () => {
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
      console.log(enrichedVehicles);

      setVehicles(enrichedVehicles);
      setFilteredVehicles(enrichedVehicles);
      setBrands(brandsData.brands);
      setCategories(categoriesData.categories);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchVehicles();
}, []);



  useEffect(() => {
    const results = vehicles.filter(vehicle =>
      (vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Accediendo a `name`
      vehicle.year.toString().includes(searchTerm)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(vehicle.brand.id)) && // Comprobar con `id`
      (selectedCategories.length === 0 || selectedCategories.includes(vehicle.category.id)) && // Comprobar con `id`
      (!minPrice || vehicle.price >= parseFloat(minPrice)) &&
      (!maxPrice || vehicle.price <= parseFloat(maxPrice)) &&
      (!minYear || vehicle.year >= parseInt(minYear)) &&
      (!maxYear || vehicle.year <= parseInt(maxYear))
    ).sort((a, b) => {
      if (sortKey === 'priceAsc') return parseFloat(a.price) - parseFloat(b.price);
      if (sortKey === 'priceDesc') return parseFloat(b.price) - parseFloat(a.price);
      if (sortKey === 'yearAsc') return a.year - b.year;
      if (sortKey === 'yearDesc') return b.year - a.year;
      return 0;
    });

    setFilteredVehicles(results);
  }, [searchTerm, sortKey, vehicles, selectedBrands, selectedCategories, minPrice, maxPrice, minYear, maxYear]);

  useEffect(() => {
    const handleScroll = () => {
      // Muestra el botón si el usuario ha desplazado más de 200px desde el top
      const shouldShow = window.pageYOffset > 200;
      setShowScrollButton(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };

  const handleCheckboxChange = (type, value) => {
    if (type === 'brand') {
      setSelectedBrands(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    } else {
      setSelectedCategories(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    }
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="filters-container">
          <div className="filter-header">Filtrar por Marca:</div>
          <select className="filter-dropdown" onChange={handleCheckboxChange}>
            <option value="">Todas las marcas</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.id}>{brand.name}</option>
            ))}
          </select>

          <div className="filter-header">Filtrar por Categoría:</div>
          <select className="filter-dropdown" onChange={handleCheckboxChange}>
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <div className="filter-header">Rango de Precios:</div>
          <input type="number" className="filter-dropdown" placeholder="Precio mínimo" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
          <input type="number" className="filter-dropdown" placeholder="Precio máximo" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />

          <div className="filter-header">Rango de Años:</div>
          <input type="number" className="filter-dropdown" placeholder="Año mínimo" value={minYear} onChange={e => setMinYear(e.target.value)} />
          <input type="number" className="filter-dropdown" placeholder="Año máximo" value={maxYear} onChange={e => setMaxYear(e.target.value)} />
        </div>
      </div>
      <div className="main-content">
        <div className="search-and-sort-container">
          <input
            className="search-input"       type="text"
      placeholder="Buscar por marca, modelo o año..."
      value={searchTerm}
      onChange={handleSearchChange}
    />
    <select
      className="sort-select"
      onChange={handleSortChange}
      value={sortKey}
    >
      <option value="">Ordenar por</option>
      <option value="priceAsc">Precio Ascendente</option>
      <option value="priceDesc">Precio Descendente</option>
      <option value="yearAsc">Año Ascendente</option>
      <option value="yearDesc">Año Descendente</option>
    </select>
  </div>
  <div className="vehicles-grid">
    {filteredVehicles.map(vehicle => (
      <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => openModal(vehicle)} />
    ))}
  </div>
  {selectedVehicle && (
    <VehicleDetailsModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
  )}
  {showScrollButton && (
    <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      ↑ Subir
    </button>
  )}
</div>
</div>
);


};

export default VehiclesGridPage;