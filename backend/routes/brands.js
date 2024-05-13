import express from 'express';
import db from '../database/db.js';
const router = express.Router();

router.get('/', (req, res) => {
  db.all('SELECT * FROM brands', [], (err, brands) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener marcas' });
    }
    res.json({ brands });
  });
});

// Añade aquí más operaciones CRUD según sea necesario

export default router;
