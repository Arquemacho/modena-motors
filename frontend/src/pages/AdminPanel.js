import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPanel.css';


const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <nav className="admin-nav">
        <ul>
          <li><Link to="/admin/vehicles">Manage Vehicles</Link></li>
          <li><Link to="/admin/employees">Manage Employees</Link></li>
          <li><Link to="/admin/clients">Manage Clients</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;
