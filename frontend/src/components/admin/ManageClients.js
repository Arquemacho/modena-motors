import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import '../../styles/ManageClients.css';
import { Link } from 'react-router-dom';

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vipStatus, setVipStatus] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://186.113.234.239:3001/api/clients', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setClients(data.clients);
      } catch (error) {
        console.error(error);
        alert(`Failed to fetch clients: ${error.message}`);
      }
    };
    fetchClients();
  }, [token]);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setVipStatus(false);
    setEditingClient(null);
  };

  const handleAddOrUpdateClient = async (event) => {
    event.preventDefault();
    const clientData = {
      name,
      email,
      phone,
      vipStatus,
    };

    const url = editingClient ? `http://186.113.234.239:3001/api/clients/${editingClient.id}` : 'http://186.113.234.239:3001/api/clients';
    const method = editingClient ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientData)
      });

      if (response.ok) {
        const result = await response.json();
        const updatedList = editingClient ? clients.map(cli => cli.id === editingClient.id ? { ...cli, ...clientData } : cli) : [...clients, { id: result.id, ...clientData }];
        setClients(updatedList);
        clearForm();
      } else {
        const errorText = await response.text();
        alert(`Failed to update the client: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error updating client: ${error.message}`);
    }
  };

  const handleEdit = (client) => {
    setName(client.name);
    setEmail(client.email);
    setPhone(client.phone);
    setVipStatus(client.vipStatus);
    setEditingClient(client);
  };

  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(`http://186.113.234.239:3001/api/clients/${clientId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setClients(clients.filter(client => client.id !== clientId));
      } else {
        const errorText = await response.text();
        alert(`Failed to delete the client: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      alert(`Error deleting client: ${error.message}`);
    }
  };

  return (
    <div className="manage-clients">
      <h1>Gestión de Clientes</h1>
      <Link to="/admin-panel" className="back-to-admin">Volver al Panel Administrativo</Link>
      <form onSubmit={handleAddOrUpdateClient} className="client-form">
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" required />
        <input type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Teléfono" required />
        <div>
          <label>
            Estado VIP:
            <input type="checkbox" name="vipStatus" checked={vipStatus} onChange={e => setVipStatus(e.target.checked)} />
          </label>
        </div>
        <button type="submit">{editingClient ? 'Actualizar Cliente' : 'Agregar Cliente'}</button>
      </form>
      <div className="client-list">
        {clients.map(client => (
          <div key={client.id} className={`client-item ${client.vipStatus ? 'vip' : ''}`}>
            <div className="client-details">
              <p>{client.name} - {client.email} - {client.phone} - VIP: {client.vipStatus ? 'Sí' : 'No'}</p>
            </div>
            <div className="client-actions">
              <button onClick={() => handleEdit(client)}>Editar</button>
              <button onClick={() => handleDelete(client.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageClients;