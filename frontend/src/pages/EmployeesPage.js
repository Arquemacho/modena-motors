import React from 'react';
import '../styles/EmployeesPage.css'; // Asegúrate de tener este archivo CSS

const EmployeesPage = () => {
  const employees = [
    {
      id: 1,
      name: "Diego Papasito",
      image: "/images/johndoe.jpg",
      position: "Dueno de mi Corazon",
      years: 5
    },
	{
		id: 2,
		name: "Diego Churrasco",
		image: "/images/johndoe.jpg",
		position: "Todos somos Diego",
		years: 4
	  },
	  {
		id: 3,
		name: "Diego",
		image: "/images/johndoe.jpg",
		position: "Todos somos Diego",
		years: 3
	  },
	  {
		  id: 4,
		  name: "Diego  hotdog",
		  image: "/images/johndoe.jpg",
		  position: "Todos somos Diego",
		  years: 2
		},
		{
			id: 5,
			name: "Diego daddy",
			image: "/images/johndoe.jpg",
			position: "Todos somos Diego",
			years: 1
		  },
		  {
			  id: 6,
			  name: "Diego Mi amor",
			  image: "/images/johndoe.jpg",
			  position: "Todos somos Diego",
			  years: 6
			}
    // Agrega más empleados aquí según sea necesario
  ];

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
