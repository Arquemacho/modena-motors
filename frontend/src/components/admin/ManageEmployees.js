import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error(error);
        alert(`Failed to fetch employees: ${error.message}`);
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
      imageURL: form.imageURL.value,
    };

    const url = editingEmployee ? `http://localhost:3001/api/employees/${editingEmployee.id}` : '/api/employees';
    const method = editingEmployee ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(employeeData)
      });

      if (response.ok) {
        const result = await response.json();
        const updatedList = editingEmployee ? employees.map(emp => emp.id === editingEmployee.id ? { ...emp, ...employeeData } : emp) : [...employees, result];
        setEmployees(updatedList);
        setEditingEmployee(null); // Reset editing state
      } else {
        const errorText = await response.text();
        alert(`Failed to update the employee: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error updating employee: ${error.message}`);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setEmployees(employees.filter(employee => employee.id !== employeeId));
      } else {
        const errorText = await response.text();
        alert(`Failed to delete the employee: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error deleting employee: ${error.message}`);
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
