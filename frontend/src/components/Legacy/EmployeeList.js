import React, { useState, useEffect } from 'react';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('/api/employees')
      .then((response) => response.json())
      .then((data) => setEmployees(data.rows))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Empleados</h1>
      {employees.length > 0 ? (
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <img src={employee.imageURL} alt={employee.name} style={{ width: '100px' }} />
              <h2>{employee.name}</h2>
              <p>{employee.position}</p>
              {/* Más información del empleado si es necesario */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay empleados para mostrar.</p>
      )}
    </div>
  );
};

export default EmployeeList;
