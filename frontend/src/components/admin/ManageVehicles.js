import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Promise.all([
          fetch('http://localhost:3001/api/vehicles', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:3001/api/brands', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:3001/api/categories', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (!res[0].ok || !res[1].ok || !res[2].ok) throw new Error('Failed to fetch data');

        const data = await Promise.all(res.map(r => r.json()));
        setVehicles(data[0].vehicles);
        setBrands(data[1].brands);
        setCategories(data[2].categories);
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
    formData.append('brand', brands.find(brand => brand.id === parseInt(form.brand_id.value)).name); // Modificación aquí    formData.append('category_id', form.category_id.value);
    formData.append('model', form.model.value);
    formData.append('year', form.year.value);
    formData.append('price', form.price.value);
    formData.append('description', form.description.value);
    if (form.image.files[0]) formData.append('image', form.image.files[0]);

    const url = editingVehicle ? `http://localhost:3001/api/vehicles/${editingVehicle.id}` : 'http://localhost:3001/api/vehicles';
    const method = editingVehicle ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        const updatedList = editingVehicle ? vehicles.map(veh => veh.id === editingVehicle.id ? { ...veh, ...result } : veh) : [...vehicles, result];
        setVehicles(updatedList);
        setEditingVehicle(null); // Reset editing state
      } else {
        const errorText = await response.text();
        alert(`Failed to update the vehicle: ${errorText}`);
      }
    } catch (error) {
      console.error('Error on submit:', error.message);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleDelete = async (vehicleId) => {
    const response = await fetch(`http://localhost:3001/api/vehicles/${vehicleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      setVehicles(vehicles.filter(veh => veh.id !== vehicleId));
    } else {
      const errorText = await response.text();
      alert(`Failed to delete the vehicle: ${errorText}`);
    }
  };

  return (
    <div>
      <h1>Gestión de Vehículos</h1>
      <form onSubmit={handleAddOrUpdateVehicle} encType="multipart/form-data">
        <select name="brand_id" required defaultValue={editingVehicle ? editingVehicle.brand_id : ''}>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <select name="category_id" required defaultValue={editingVehicle ? editingVehicle.category_id : ''}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <input type="text" name="model" defaultValue={editingVehicle ? editingVehicle.model : ''} placeholder="Model" required />
        <input type="number" name="year" defaultValue={editingVehicle ? editingVehicle.year : ''} placeholder="Year" required />
        <input type="number" name="price" defaultValue={editingVehicle ? editingVehicle.price : ''} placeholder="Price" required />
        <textarea name="description" defaultValue={editingVehicle ? editingVehicle.description : ''} placeholder="Description" required />
        <input type="file" name="image" accept="image/*" />
        <button type="submit">{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</button>
      </form>
      {vehicles.map(vehicle => (
        <div key={vehicle.id}>
          <p>{vehicle.brand} {vehicle.model} - {vehicle.year}</p>
          <button onClick={() => handleEdit(vehicle)}>Edit</button>
          <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageVehicles;
