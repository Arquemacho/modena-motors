import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import '../../styles/ManageContact.css';  // Asegúrate de tener este archivo CSS
import { Link } from 'react-router-dom';


const ManageContact = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/contact', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        setContactRequests(data.contactRequests);
      } catch (error) {
        console.error('Failed to fetch contact requests:', error);
      }
    };

    fetchContactRequests();
  }, [token]);

  const handleMarkAsAttended = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/contact/${id}/mark-as-attended`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const updatedRequests = contactRequests.map(request => {
          if (request.id === id) {
            return { ...request, attended: true };
          }
          return request;
        });
        setContactRequests(updatedRequests);
      } else {
        alert('Failed to mark as attended');
      }
    } catch (error) {
      console.error('Error marking request as attended:', error);
    }
  };

  return (
    <div className="manage-contact">
    <Link to="/admin-panel" className="back-to-admin">Volver al Panel Administrativo</Link>
      <h1>Gestión de Solicitudes de Contacto</h1>
      <div className="contact-list">
        {contactRequests.map(request => (
          <div key={request.id} className="contact-item">
            <div className="contact-details">
              <p>Nombre: {request.name}</p>
              <p>Email: {request.email}</p>
              <p>Teléfono: {request.phone}</p>
              <p>Mensaje: {request.message}</p>
              <p>Atendido: {request.attended ? 'Sí' : 'No'}</p>
            </div>
            <div className="contact-actions">
              {!request.attended && (
                <button onClick={() => handleMarkAsAttended(request.id)}>Marcar como Atendido</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageContact;
