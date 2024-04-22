import React, { useState, useEffect } from 'react';
import '../styles/AdminClientsPage.css'; // Asegúrate de tener este archivo CSS

const AdminClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Aquí se cargarían los datos de los clientes desde un servidor
    setClients([
      { id: 1, name: "Alice Johnson", vipStatus: true },
      { id: 2, name: "Bob Smith", vipStatus: true }
    ]);
  }, []);

  return (
    <div className="admin-clients-page">
      <h1>Clientes Preferenciales</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>{client.name} - VIP: {client.vipStatus ? "Sí" : "No"}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminClientsPage;
