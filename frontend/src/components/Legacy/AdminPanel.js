import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <nav>
        <Link to="/admin/vehicles">Gestión de Vehículos</Link>
        <Link to="/admin/employees">Gestión de Empleados</Link>
        <Link to="/admin/users">Gestión de Usuarios</Link>
        {/* Más enlaces según sea necesario */}
      </nav>
      {/* Aquí irían los componentes o rutas específicas para gestionar cada sección */}
    </div>
  );
};

export default AdminPanel;
