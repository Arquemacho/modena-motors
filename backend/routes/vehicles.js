const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Obtener todos los vehículos con manejo de errores mejorado
router.get('/', (req, res) => {
  db.all('SELECT * FROM vehicles', [], (err, vehicles) => {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al obtener vehículos' }); // Enviar respuesta en JSON
    }
    res.json({ vehicles });
  });
});

// Obtener un vehículo específico por ID con manejo de errores mejorado
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM vehicles WHERE id = ?', [req.params.id], (err, vehicle) => {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al obtener el vehículo' }); // Enviar respuesta en JSON
    }
    if (vehicle) {
      res.json({ vehicle });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  });
});

// Crear un nuevo vehículo con manejo de errores mejorado
router.post('/', (req, res) => {
  const { brand, model, year, price, description, imageURL } = req.body;
  db.run('INSERT INTO vehicles (brand, model, year, price, description, imageURL) VALUES (?, ?, ?, ?, ?, ?)', [brand, model, year, price, description, imageURL], function(err) {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al añadir vehículo' }); // Enviar respuesta en JSON
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Actualizar un vehículo existente con manejo de errores mejorado
router.put('/:id', (req, res) => {
  const { brand, model, year, price, description, imageURL } = req.body;
  db.run('UPDATE vehicles SET brand = ?, model = ?, year = ?, price = ?, description = ?, imageURL = ? WHERE id = ?', [brand, model, year, price, description, imageURL, req.params.id], function(err) {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al actualizar vehículo' }); // Enviar respuesta en JSON
    }
    res.json({ message: 'Vehicle updated', changes: this.changes });
  });
});

// Eliminar un vehículo con manejo de errores mejorado
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM vehicles WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(err.message); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al eliminar vehículo' }); // Enviar respuesta en JSON
    }
    res.json({ message: 'Vehicle deleted', changes: this.changes });
  });
});

module.exports = router;
