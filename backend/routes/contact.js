import express from 'express';
import db from '../database/db.js';
const router = express.Router();

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
  db.all('SELECT contact_requests.*, clients.*, contact_requests.attended == 1 AS attended FROM contact_requests JOIN clients ON contact_requests.client_id = clients.id', [], (err, requests) => {
    if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error al obtener las solicitudes de contacto' });
    }
    // Asegurarse de que todos los valores booleanos son correctamente interpretados
    const formattedRequests = requests.map(request => ({
      ...request,
      attended: request.attended === 1, // Asegura que attended es un booleano
      priority: request.priority === 1  // Asegura que priority es un booleano
    }));
    res.json({ contactRequests: formattedRequests });
  });
});

router.put('/:id/mark-as-attended', (req, res) => {
  db.run('UPDATE contact_requests SET attended = TRUE WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al marcar como atendido' });
    }
    console.log("Updated mark attended", req.params);  // Muestra el ID para asegurar que solo se actualiza una vez
    res.json({ message: 'Solicitud marcada como atendida', changes: this.changes });
  });
});


export default router;
