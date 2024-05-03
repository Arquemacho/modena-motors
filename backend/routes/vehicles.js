// routes/vehicles.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../database/db');
const path = require('path');

// Configuración de multer para vehículos
const storageVehicles = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/vehicles/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id || Date.now()}-${file.originalname}`);
  }
});

const uploadVehicles = multer({ storage: storageVehicles });

router.get('/', (req, res) => {
  db.all('SELECT * FROM vehicles', [], (err, vehicles) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener vehículos' });
    }
    res.json({ vehicles });
  });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM vehicles WHERE id = ?', [req.params.id], (err, vehicle) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener el vehículo' });
    }
    if (vehicle) {
      res.json({ vehicle });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  });
});

router.post('/', uploadVehicles.single('image'), (req, res) => {
  const { brand, model, year, price, description } = req.body;
  const imageURL = req.file ? `/uploads/vehicles/${req.file.filename}` : null;

  db.run(
    'INSERT INTO vehicles (brand, model, year, price, description, imageURL) VALUES (?, ?, ?, ?, ?, ?)',
    [brand, model, year, price, description, imageURL],
    function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error al añadir vehículo' });
      }
      res.status(201).json({ id: this.lastID, brand, model, year, price, description, imageURL });
    }
  );
});

router.put('/:id', uploadVehicles.single('image'), (req, res) => {
  const { brand, model, year, price, description } = req.body;
  const imageURL = req.file ? `/uploads/vehicles/${req.file.filename}` : null;

  const sql = 'UPDATE vehicles SET brand = ?, model = ?, year = ?, price = ?, description = ?, imageURL = ? WHERE id = ?';
  const params = [brand, model, year, price, description, imageURL, req.params.id];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al actualizar vehículo' });
    }
    res.json({ message: 'Vehicle updated', changes: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM vehicles WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al eliminar vehículo' });
    }
    res.json({ message: 'Vehicle deleted', changes: this.changes });
  });
});

module.exports = router;
