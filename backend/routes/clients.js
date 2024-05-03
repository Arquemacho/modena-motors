// routes/clients.js
const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM clients', [], (err, clients) => {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al obtener clientes' }); // Enviar respuesta en JSON
    }
    res.json({ clients });
  });
});

router.post('/', (req, res) => {
  const { name, email, phone, vipStatus } = req.body;
  db.run(
    'INSERT INTO clients (name, email, phone, vipStatus) VALUES (?, ?, ?, ?)',
    [name, email, phone, vipStatus],
    function(err) {
      if (err) {
        console.error(err.message); // Loguear el error en el servidor
        return res.status(500).json({ error: 'Error al añadir cliente' }); // Enviar respuesta en JSON
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

router.put('/:id', (req, res) => {
  const { name, email, phone, vipStatus } = req.body;
  const sql = 'UPDATE clients SET name = ?, email = ?, phone = ?, vipStatus = ? WHERE id = ?';
  const params = [name, email, phone, vipStatus, req.params.id];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al actualizar cliente' });
    }
    res.json({ message: 'Cliente actualizado', changes: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM clients WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al eliminar cliente' });
    }
    res.json({ message: 'Cliente eliminado', changes: this.changes });
  });
});

module.exports = router;
