const express = require('express');
const router = express.Router();
const db = require('../database/db');

// POST: Crear una nueva solicitud de contacto
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;

  // Verificar si el cliente existe
  db.get('SELECT id, vipStatus FROM clients WHERE email = ?', [email], (err, client) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send({ error: 'Error al verificar el cliente' });
    }

    if (client) {
      // Cliente existe, proceder a crear la solicitud de contacto
      createContactRequest(client.id, message, client.vipStatus);
    } else {
      // Cliente no existe, crear un nuevo cliente
      db.run('INSERT INTO clients (name, email, phone, vipStatus) VALUES (?, ?, ?, ?)', [name, email, phone, false], function (err) {
        if (err) {
          console.error(err.message);
          return res.status(500).send({ error: 'Error al crear el cliente' });
        }
        // Crear solicitud de contacto para el nuevo cliente
        createContactRequest(this.lastID, message, false);
      });
    }
  });

  function createContactRequest(clientId, message, vipStatus) {
    db.run('INSERT INTO contact_requests (client_id, message, attended, priority) VALUES (?, ?, ?, ?)', [clientId, message, false, vipStatus], function (err) {
      if (err) {
        console.error(err.message);
        return res.status(500).send({ error: 'Error al crear la solicitud de contacto' });
      }
      res.status(201).send({ id: this.lastID });
    });
  }
});

// GET: Recuperar todas las solicitudes de contacto
router.get('/', (req, res) => {
  db.all('SELECT * FROM contact_requests JOIN clients ON contact_requests.client_id = clients.id', [], (err, requests) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener las solicitudes de contacto' });
    }
    res.json({ contactRequests: requests });
  });
});

module.exports = router;
