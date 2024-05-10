import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import '../../styles/ManageEmployees.css';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    timeInCompany: '',
    image: null
  });

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('http://186.113.234.239:3001/api/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data.employees);
      } else {
        const errorText = await response.text();
        alert(`Failed to fetch employees: ${errorText}`);
      }
    };
    fetchEmployees();
  }, [token]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({...formData, image: e.target.files[0]});
    } else {
      setFormData({...formData, [e.target.name]: e.target.value});
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('position', formData.position);
    data.append('timeInCompany', formData.timeInCompany);
    if (formData.image) {
      data.append('image', formData.image);
    } else if (editingEmployee && !formData.image && editingEmployee.imageURL) {
      // Ensure the imageURL is not overwritten if not updating the image
      data.append('imageURL', editingEmployee.imageURL);
    }

    const url = editingEmployee ? `http://186.113.234.239:3001/api/employees/${editingEmployee.id}` : 'http://186.113.234.239:3001/api/employees';
    const method = editingEmployee ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: data
      });

      if (response.ok) {
        const result = await response.json();
        const updatedList = editingEmployee ? employees.map(emp => emp.id === editingEmployee.id ? {...emp, ...result, imageURL: result.imageURL || emp.imageURL} : emp) : [...employees, result];
        setEmployees(updatedList);
        clearForm();
      } else {
        const errorText = await response.text();
        alert(`Failed to update the employee: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error updating employee: ${error.message}`);
    }
  };

  const clearForm = () => {
    setEditingEmployee(null);
    setFormData({
      name: '',
      position: '',
      timeInCompany: '',
      image: null
    });
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      position: employee.position,
      timeInCompany: employee.timeInCompany,
      image: null
    });
  };

  const handleDelete = async (employeeId) => {
    const response = await fetch(`http://186.113.234.239:3001/api/employees/${employeeId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
    } else {
      const errorText = await response.text();
      alert(`Failed to delete the employee: ${errorText}`);
    }
  };

  return (
    <div>
      <h1>Gestión de Empleados</h1>
	  <Link to="/admin-panel" className="back-to-admin">Volver al Panel Administrativo</Link>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="employee-form">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Cargo" required />
        <input type="number" name="timeInCompany" value={formData.timeInCompany} onChange={handleChange} placeholder="Años en la empresa" required />
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
        <button type="submit">{editingEmployee ? 'Actualizar Empleado' : 'Agregar Empleado'}</button>
      </form>
      <div className="employee-list">
        {employees.map(employee => (
          <div key={employee.id} className="employee-item">
            <div>
              {employee.imageURL && <img src={employee.imageURL} alt={employee.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
            </div>
            <div className="employee-details">
              <p>{employee.name} - {employee.position} - {employee.timeInCompany} años</p>
            </div>
            <div className="employee-actions">
              <button onClick={() => handleEdit(employee)}>Editar</button>
              <button onClick={() => handleDelete(employee.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEmployees;