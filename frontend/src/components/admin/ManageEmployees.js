import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/api/employees', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data.rows);
      } else {
        alert("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, [token]);

  const handleAddOrUpdateEmployee = async (event) => {
    event.preventDefault();
    const form = event.target;
    const employeeData = {
      name: form.name.value,
      position: form.position.value,
      timeInCompany: form.timeInCompany.value,
      imageURL: form.imageURL.value
    };

    const url = editingEmployee ? `/api/employees/${editingEmployee.id}` : '/api/employees';
    const method = editingEmployee ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(employeeData)
    });

    if (response.ok) {
      const updatedList = editingEmployee ? employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...employeeData } : emp) : [...employees, await response.json()];
      setEmployees(updatedList);
      setEditingEmployee(null); // Reset editing state
    } else {
      alert("Failed to update the employee");
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (employeeId) => {
    const response = await fetch(`/api/employees/${employeeId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (response.ok) {
      setEmployees(employees.filter(employee => employee.id !== employeeId));
    } else {
      alert("Failed to delete the employee");
    }
  };

  return (
    <div>
      <h1>Gestión de Empleados</h1>
      <form onSubmit={handleAddOrUpdateEmployee}>
        <input type="text" name="name" defaultValue={editingEmployee ? editingEmployee.name : ''} placeholder="Name" required />
        <input type="text" name="position" defaultValue={editingEmployee ? editingEmployee.position : ''} placeholder="Position" required />
        <input type="number" name="timeInCompany" defaultValue={editingEmployee ? editingEmployee.timeInCompany : ''} placeholder="Years in Company" required />
        <input type="text" name="imageURL" defaultValue={editingEmployee ? editingEmployee.imageURL : ''} placeholder="Image URL" required />
        <button type="submit">{editingEmployee ? 'Update' : 'Add'}</button>
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
