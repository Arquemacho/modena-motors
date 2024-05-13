import express from 'express';
import db from '../database/db.js';
const router = express.Router();

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

export default router;
