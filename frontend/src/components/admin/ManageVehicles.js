import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchVehicles = async () => {
      const response = await fetch('http://localhost:3001/api/vehicles', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setVehicles(data.vehicles);
      } else {
        const errorText = await response.text(); // Obtiene el mensaje de error del cuerpo de la respuesta
        alert(`Failed to fetch vehicles: ${errorText}`);
      }
    };
    fetchVehicles();
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
      <form onSubmit={handleAddOrUpdateVehicle}>
        <input type="text" name="brand" defaultValue={editingVehicle ? editingVehicle.brand : ''} placeholder="Brand" required />
        <input type="text" name="model" defaultValue={editingVehicle ? editingVehicle.model : ''} placeholder="Model" required />
        <input type="number" name="year" defaultValue={editingVehicle ? editingVehicle.year : ''} placeholder="Year" required />
        <input type="number" name="price" defaultValue={editingVehicle ? editingVehicle.price : ''} placeholder="Price" required />
        <textarea name="description" defaultValue={editingVehicle ? editingVehicle.description : ''} placeholder="Description" required />
        <input type="file" name="image" accept="image/*" required />
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
