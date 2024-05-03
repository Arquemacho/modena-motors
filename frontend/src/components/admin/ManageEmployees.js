import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

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
      const response = await fetch('http://localhost:3001/api/employees', {
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

    const url = editingEmployee ? `http://localhost:3001/api/employees/${editingEmployee.id}` : 'http://localhost:3001/api/employees';
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
    const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
        <input type="number" name="timeInCompany" value={formData.timeInCompany} onChange={handleChange} placeholder="Years in Company" required />
        <input type="file" name="image" onChange={handleChange} accept="image/*" />
        <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
      </form>
      {employees.map(employee => (
        <div key={employee.id}>
          <p>{employee.name}</p>
          <button onClick={() => handleEdit(employee)}>Edit</button>
          <button onClick={() => handleDelete(employee.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageEmployees;
