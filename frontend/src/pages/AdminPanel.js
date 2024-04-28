import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css'; // Asegúrate de tener este archivo CSS

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <div className="admin-links">
        <Link to="/admin/vehicles">Gestionar Vehículos</Link>
        <Link to="/admin/employees">Gestionar Empleados</Link>
        <Link to="/admin/clients">Clientes Preferenciales</Link>
      </div>
    </div>
  );
};

export default AdminPanel;
