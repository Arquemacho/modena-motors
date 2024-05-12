import React, { useState, useEffect, useRef } from 'react';
import VehicleCard from '../components/VehicleCard';
import VehicleDetailsModal from '../components/VehicleDetailsModal';
import '../styles/VehiclesGridPage.css';
import { useParams } from 'react-router-dom';

const VehiclesGridPage = () => {
  const { brandName, categoryName, vehicleId } = useParams();
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
		const vehicleResponse = await fetch('http://186.113.234.239:3001/api/vehicles');
		const brandResponse = await fetch('http://186.113.234.239:3001/api/brands');
		const categoryResponse = await fetch('http://186.113.234.239:3001/api/categories');
  
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
  
		setVehicles(enrichedVehicles);
		setBrands(brandsData.brands);
		setCategories(categoriesData.categories);
  
		// Reset filters before applying new ones based on URL
		setSelectedBrands([]);
		setSelectedCategories([]);
  
		// Pre-filtrado basado en parámetros de URL
		if (brandName) {
		  const brand = brandsData.brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
		  if (brand) {
			setSelectedBrands([brand.id]);
		  }
		}
		if (categoryName) {
		  const category = categoriesData.categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
		  if (category) {
			setSelectedCategories([category.id]);
		  }
		}
		if (vehicleId) {
		  const selected = enrichedVehicles.find(vehicle => vehicle.id.toString() === vehicleId);
		  if (selected) {
			setSelectedVehicle(selected);
		  }
		}
	  } catch (error) {
		console.error('Error:', error);
	  }
	};
	fetchVehicles();
  }, [brandName, categoryName, vehicleId]); // Dependencias incluyen parámetros de URL
  



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

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleBrandChange = (event) => {
	const brandId = parseInt(event.target.value);
	if (event.target.checked) {
	  setSelectedBrands([...selectedBrands, brandId]);
	} else {
	  setSelectedBrands(selectedBrands.filter(id => id !== brandId));
	}
  };
  
  const handleCategoryChange = (event) => {
	const categoryId = parseInt(event.target.value);
	if (event.target.checked) {
	  setSelectedCategories([...selectedCategories, categoryId]);
	} else {
	  setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
	}
  };
  
  return (
    <div className="vehicles-page-container">
      <aside className="filters-sidebar">
		  <h4>Filtrar por Marca:</h4>
		  {brands.map(brand => (
			<div key={brand.id} className="filter-checkbox">
			  <input
				type="checkbox"
				id={`brand-${brand.id}`}
				value={brand.id}
				checked={selectedBrands.includes(brand.id)}
				onChange={handleBrandChange}
			  />
			  <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
			</div>
		  ))}
  
		  <h4>Filtrar por Categoría:</h4>
		  {categories.map(category => (
			<div key={category.id} className="filter-checkbox">
			  <input
				type="checkbox"
				id={`category-${category.id}`}
				value={category.id}
				checked={selectedCategories.includes(category.id)}
				onChange={handleCategoryChange}
			  />
			  <label htmlFor={`category-${category.id}`}>{category.name}</label>
			</div>
		  ))}
  
		  <h4>Rango de Precios:</h4>
		  <input type="number" placeholder="Precio mínimo" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
		  <input type="number" placeholder="Precio máximo" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
  
		  <h4>Rango de Años:</h4>
		  <input type="number" placeholder="Año mínimo" value={minYear} onChange={e => setMinYear(e.target.value)} />
		  <input type="number" placeholder="Año máximo" value={maxYear} onChange={e => setMaxYear(e.target.value)} />
	  </aside>
	  <main className="vehicles-display-area">
        <div className="search-and-sort-container">
		<input type="text" placeholder="Buscar por marca, modelo o año..." value={searchTerm} onChange={handleSearchChange} />
		<select onChange={handleSortChange} value={sortKey}>
		  <option value="">Ordenar por</option>
		  <option value="priceAsc">Precio Ascendente</option>
		  <option value="priceDesc">Precio Descendente</option>
		  <option value="yearAsc">Año Ascendente</option>
		  <option value="yearDesc">Año Descendente</option>
		</select>
		</div>
        <div className="vehicles-grid">
		  {filteredVehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => openModal(vehicle)} />)}
		</div>
		{selectedVehicle && <VehicleDetailsModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />}
		</main>
		{showScrollButton && <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ Subir</button>}
	  </div>
  );


};

export default VehiclesGridPage;