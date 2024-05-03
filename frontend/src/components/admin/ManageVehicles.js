import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar vehículos, marcas y categorías con una sola llamada API si es posible, o con múltiples fetch seguidos
        const vehiclesRes = await fetch('http://localhost:3001/api/vehicles', { headers: { 'Authorization': `Bearer ${token}` } });
        const brandsRes = await fetch('http://localhost:3001/api/brands', { headers: { 'Authorization': `Bearer ${token}` } });
        const categoriesRes = await fetch('http://localhost:3001/api/categories', { headers: { 'Authorization': `Bearer ${token}` } });

        if (!vehiclesRes.ok || !brandsRes.ok || !categoriesRes.ok) throw new Error('Failed to fetch data');
        const vehiclesData = await vehiclesRes.json();
        const brandsData = await brandsRes.json();
        const categoriesData = await categoriesRes.json();

        setVehicles(vehiclesData.vehicles);
        setBrands(brandsData.brands);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };
    fetchData();
  }, [token]);

  const handleAddOrUpdateVehicle = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData();
    formData.append("brand", form.brand.value);
    formData.append("model", form.model.value);
    formData.append("year", form.year.value);
    formData.append("price", form.price.value);
    formData.append("description", form.description.value);
    formData.append("image", form.image.files[0]);

    const url = editingVehicle ? `http://localhost:3001/api/vehicles/${editingVehicle.id}` : '/api/vehicles';
    const method = editingVehicle ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData // Usamos FormData para enviar la información del formulario
    });

    if (response.ok) {
      const result = await response.json();
      const updatedList = editingVehicle ? vehicles.map(veh => veh.id === editingVehicle.id ? { ...veh, ...result } : veh) : [...vehicles, { ...result }];
      setVehicles(updatedList);
      setEditingVehicle(null); // Restablecer el estado de edición
    } else {
      const errorText = await response.text();
      alert(`Failed to update the vehicle: ${errorText}`);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleDelete = async (vehicleId) => {
    const response = await fetch(`http://localhost:3001/api/vehicles/${vehicleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    } else {
      const errorText = await response.text();
      alert(`Failed to delete the vehicle: ${errorText}`);
    }
  };

  return (
    <div>
      <h1>Gestión de Vehículos</h1>
      <form onSubmit={handleAddOrUpdateVehicle} encType="multipart/form-data">
        <select name="brand_id" required onChange={handleInputChange} value={editingVehicle ? editingVehicle.brand_id : ''}>
          {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
        </select>
        <select name="category_id" required onChange={handleInputChange} value={editingVehicle ? editingVehicle.category_id : ''}>
          {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
        {/* Otros campos */}
      </form>
      {/* Lista de vehículos */}
    </div>
  );
};

export default ManageVehicles;
