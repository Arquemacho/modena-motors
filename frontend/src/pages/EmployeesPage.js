import React, { useState, useEffect } from 'react';
import '../styles/EmployeesPage.css';

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://186.113.234.239:3001/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setEmployees(data.employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employees-page">
      <h1>Conoce a Nuestro Equipo</h1>
      <div className="employee-gallery">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <img src={`http://186.113.234.239:3001${employee.imageURL}`} alt={employee.name} onError={(e) => { e.target.onerror = null; e.target.src = '/images/default.jpg'; }} />
            <h2>{employee.name}</h2>
            <p>Cargo: {employee.position}</p>
            <p>Tiempo en la empresa: {employee.timeInCompany} años</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
