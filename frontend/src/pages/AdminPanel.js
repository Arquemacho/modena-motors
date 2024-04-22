import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css'; // Asegúrate de tener este archivo CSS

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <ul>
        <li><Link to="/admin/vehicles">Gestionar Vehículos</Link></li>
        <li><Link to="/admin/employees">Gestionar Empleados</Link></li>
        <li><Link to="/admin/clients">Clientes Preferenciales</Link></li>
      </ul>
    </div>
  );
};

export default AdminPanel;
