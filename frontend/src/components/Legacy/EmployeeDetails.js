import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const [employee, setEmployee] = useState(null);
  const { id } = useParams(); // El ID del empleado se obtiene de la URL

  useEffect(() => {
    fetch(`/api/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error('Error:', error));
  }, [id]);

  if (!employee) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>{employee.name}</h2>
      <img src={employee.imageURL} alt={`${employee.name}`} style={{ width: '200px', height: 'auto' }} />
      <p><strong>Cargo:</strong> {employee.position}</p>
      <p><strong>Tiempo en la compañía:</strong> {employee.timeInCompany} años</p>
      {/* Agrega aquí más detalles que consideres importantes */}
    </div>
  );
};

export default EmployeeDetails;
