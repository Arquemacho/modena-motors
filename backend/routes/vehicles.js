const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Endpoint para obtener todos los vehículos
router.get('/', (req, res) => {
  db.all('SELECT * FROM vehicles', [], (err, vehicles) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ vehicles });
  });
});

// Endpoint para obtener un vehículo específico por ID
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM vehicles WHERE id = ?', [req.params.id], (err, vehicle) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (vehicle) {
      res.json({ vehicle });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  });
});

// Endpoint para crear un nuevo vehículo
router.post('/', (req, res) => {
  const { brand, model, year, price, description, imageURL } = req.body;
  db.run('INSERT INTO vehicles (brand, model, year, price, description, imageURL) VALUES (?, ?, ?, ?, ?, ?)', [brand, model, year, price, description, imageURL], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint para actualizar un vehículo existente
router.put('/:id', (req, res) => {
  const { brand, model, year, price, description, imageURL } = req.body;
  db.run('UPDATE vehicles SET brand = ?, model = ?, year = ?, price = ?, description = ?, imageURL = ? WHERE id = ?', [brand, model, year, price, description, imageURL, req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Vehicle updated', changes: this.changes });
  });
});

// Endpoint para eliminar un vehículo
router.delete('/:id', (req, res) => {
	db.run('DELETE FROM vehicles WHERE id = ?', [req.params.id], function(err) {
	  if (err) {
		res.status(500).json({ error: err.message });
		return;
	  }
	  res.json({ message: 'Vehicle deleted', changes: this.changes });
	});
  });
  module.exports = router;
