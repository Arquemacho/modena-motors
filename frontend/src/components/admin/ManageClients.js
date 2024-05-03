import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

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
        const response = await fetch('http://localhost:3001/api/clients', {
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

    const url = editingClient ? `http://localhost:3001/api/clients/${editingClient.id}` : 'http://localhost:3001/api/clients';
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
      const response = await fetch(`http://localhost:3001/api/clients/${clientId}`, {
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
    <div>
      <h1>Gestión de Clientes</h1>
      <form onSubmit={handleAddOrUpdateClient}>
        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" required />
        <label>
          VIP Status:
          <input type="checkbox" name="vipStatus" checked={vipStatus} onChange={e => setVipStatus(e.target.checked)} />
        </label>
        <button type="submit">{editingClient ? 'Update Client' : 'Add Client'}</button>
      </form>
      {clients.map(client => (
        <div key={client.id}>
          <p>{client.name} - {client.email} - VIP: {client.vipStatus ? 'Yes' : 'No'}</p>
          <button onClick={() => handleEdit(client)}>Edit</button>
          <button onClick={() => handleDelete(client.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ManageClients;
