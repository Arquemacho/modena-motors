import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import '../../styles/ManageVehicles.css';
import { Link } from 'react-router-dom';

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
		  fetch('http://186.113.234.239:3001/api/vehicles', { headers: { 'Authorization': `Bearer ${token}` } }),
		  fetch('http://186.113.234.239:3001/api/brands', { headers: { 'Authorization': `Bearer ${token}` } }),
		  fetch('http://186.113.234.239:3001/api/categories', { headers: { 'Authorization': `Bearer ${token}` } })
		]);
  
		if (!res[0].ok || !res[1].ok || !res[2].ok) throw new Error('Failed to fetch data');
  
		const data = await Promise.all(res.map(r => r.json()));
		const [vehicleData, brandData, categoryData] = data;
  
		const brandsMap = brandData.brands.reduce((acc, brand) => {
		  acc[brand.id] = brand;
		  return acc;
		}, {});
  
		const categoriesMap = categoryData.categories.reduce((acc, category) => {
		  acc[category.id] = category;
		  return acc;
		}, {});
  
		const enrichedVehicles = vehicleData.vehicles.map(vehicle => ({
		  ...vehicle,
		  brand: brandsMap[vehicle.brand_id],
		  category: categoriesMap[vehicle.category_id]
		}));
  
		setVehicles(enrichedVehicles);
		setBrands(brandData.brands);
		setCategories(categoryData.categories);
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

  // Append form data
  formData.append('brand_id', form.brand_id.value);
  formData.append('category_id', form.category_id.value);
  formData.append('model', form.model.value);
  formData.append('year', form.year.value);
  formData.append('price', form.price.value);
  formData.append('description', form.description.value);

  // Conditionally append image data
  if (form.image.files[0]) {
    formData.append('image', form.image.files[0]);
  } else if (editingVehicle && !form.image.files[0] && editingVehicle.imageURL) {
    // Append the existing image URL if no new file is provided and it exists
    formData.append('imageURL', editingVehicle.imageURL);
  }

  const url = editingVehicle ? `http://186.113.234.239:3001/api/vehicles/${editingVehicle.id}` : 'http://186.113.234.239:3001/api/vehicles';
  const method = editingVehicle ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
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
    const response = await fetch(`http://186.113.234.239:3001/api/vehicles/${vehicleId}`, {
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
	  <Link to="/admin-panel" className="back-to-admin">Volver al Panel Administrativo</Link>
	  <form onSubmit={handleAddOrUpdateVehicle} encType="multipart/form-data" className="vehicle-form">
<div>
<label>
Marca:
<select name="brand_id" required defaultValue={editingVehicle ? editingVehicle.brand_id : ''}>
<option value="">Seleccione una Marca</option>
{brands.map(brand => (
<option key={brand.id} value={brand.id}>{brand.name}</option>
))}
</select>
</label>
<label>
Categoría:
<select name="category_id" required defaultValue={editingVehicle ? editingVehicle.category_id : ''}>
<option value="">Seleccione una Categoría</option>
{categories.map(category => (
<option key={category.id} value={category.id}>{category.name}</option>
))}
</select>
</label>
</div>
<input type="text" name="model" defaultValue={editingVehicle ? editingVehicle.model : ''} placeholder="Modelo" required />
<input type="number" name="year" defaultValue={editingVehicle ? editingVehicle.year : ''} placeholder="Año" required />
<input type="number" name="price" defaultValue={editingVehicle ? editingVehicle.price : ''} placeholder="Precio" required />
<textarea name="description" defaultValue={editingVehicle ? editingVehicle.description : ''} placeholder="Descripción" required />
<input type="file" name="image" accept="image/*" />
<button type="submit">{editingVehicle ? 'Actualizar Vehículo' : 'Agregar Vehículo'}</button>
</form>
<div className="vehicle-list">
      {vehicles.map(vehicle => (
        <div key={vehicle.id} className="vehicle-details-container">
          <div>
              {vehicle.imageURL && <img src={vehicle.imageURL} alt={vehicle.model} style={{ width: '75px', height: '75px', borderRadius: '80%' }} />}
            </div>
          <div className="vehicle-details">
            <span className="detail-label">Marca:</span>
            <span className="detail-description">{vehicle.brand.name}</span>
            <span className="detail-label">Categoría:</span>
            <span className="detail-description">{vehicle.category.name}</span>
            <span className="detail-label">Modelo:</span>
            <span className="detail-description">{vehicle.model}</span>
            <span className="detail-label">Año:</span>
            <span className="detail-description">{vehicle.year}</span>
            <span className="detail-label">Precio:</span>
            <span className="detail-description">${vehicle.price}</span>
            <span className="detail-label">Descripción:</span>
            <span className="detail-description">{vehicle.description}</span>
          </div>
          <div className="vehicle-actions">
            <button onClick={() => handleEdit(vehicle)}>Editar</button>
            <button onClick={() => handleDelete(vehicle.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ManageVehicles;