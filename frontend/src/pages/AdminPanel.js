import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <ul>
          <li><Link to="/admin/vehicles">Manage Vehicles</Link></li>
          <li><Link to="/admin/employees">Manage Employees</Link></li>
          <li><Link to="/admin/clients">Manage Clients</Link></li>
          {/* Add other admin links if necessary */}
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;
