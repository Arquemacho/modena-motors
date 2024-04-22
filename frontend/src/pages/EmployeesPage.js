import React from 'react';
import '../styles/EmployeesPage.css'; // Asegúrate de tener este archivo

const EmployeesPage = () => {
  // Datos simulados de los empleados
  const employees = [{
    id: 1,
    name: "John Doe",
    image: "/images/johndoe.jpg",
    position: "Gerente General",
    years: 5
  }];

  return (
    <div className="employees-page">
      <h1>Nuestro Equipo</h1>
      <div className="employee-gallery">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <img src={employee.image} alt={employee.name} />
            <h2>{employee.name}</h2>
            <p>Cargo: {employee.position}</p>
            <p>Tiempo en la empresa: {employee.years} años</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
