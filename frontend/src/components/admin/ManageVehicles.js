import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch('/api/vehicles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setVehicles(data.vehicles);
      } else {
        alert("Failed to fetch vehicles");
      }
    };
    fetchVehicles();
  }, [token]);

  const handleAddOrUpdateVehicle = async (event) => {
    event.preventDefault();
    const form = event.target;
    const vehicleData = {
      brand: form.brand.value,
      model: form.model.value,
      year: form.year.value,
      price: form.price.value,
      description: form.description.value,
      imageURL: form.imageURL.value
    };

    const url = editingVehicle ? `/api/vehicles/${editingVehicle.id}` : '/api/vehicles';
    const method = editingVehicle ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(vehicleData)
    });

    if (response.ok) {
      const result = await response.json();
      const updatedList = editingVehicle ? vehicles.map(veh => veh.id === editingVehicle.id ? { ...veh, ...vehicleData } : veh) : [...vehicles, { id: result.id, ...vehicleData }];
      setVehicles(updatedList);
      setEditingVehicle(null); // Reset editing state
    } else {
      alert("Failed to update the vehicle");
    }
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleDelete = async (vehicleId) => {
    const response = await fetch(`/api/vehicles/${vehicleId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
    } else {
      alert("Failed to delete the vehicle");
    }
  };

  return (
    <div>
      <h1>Gestión de Vehículos</h1>
      <form onSubmit={handleAddOrUpdateVehicle}>
        <input type="text" name="brand" defaultValue={editingVehicle ? editingVehicle.brand : ''} placeholder="Brand" required />
        <input type="text" name="model" defaultValue={editingVehicle ? editingVehicle.model : ''} placeholder="Model" required />
        <input type="number" name="year" defaultValue={editingVehicle ? editingVehicle.year : ''} placeholder="Year" required />
        <input type="number" name="price" defaultValue={editingVehicle ? editingVehicle.price : ''} placeholder="Price" required />
        <textarea name="description" defaultValue={editingVehicle ? editingVehicle.description : ''} placeholder="Description" required />
        <input type="text" name="imageURL" defaultValue={editingVehicle ? editingVehicle.imageURL : ''} placeholder="Image URL" required />
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
