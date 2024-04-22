import React, { useState, useEffect } from 'react';

const VehicleFilter = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Aquí se debería llamar a un endpoint para obtener las marcas
    fetch('/api/vehicles/brands')
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Filtrar Vehículos</h1>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">Seleccionar Marca</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>{brand}</option>
        ))}
      </select>
      {/* Puedes agregar más filtros como categoría, rango de precios, etc. */}
    </div>
  );
};

export default VehicleFilter;
