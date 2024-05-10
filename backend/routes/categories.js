const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  db.all('SELECT * FROM categories', [], (err, categories) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener categorías' });
    }
    res.json({ categories });
  });
});

// Añade aquí más operaciones CRUD según sea necesario

module.exports = router;