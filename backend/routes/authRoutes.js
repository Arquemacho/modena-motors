// backend/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = "tu_clave_secreta"; // Debes cambiar esto por una clave secreta real y mantenerla en una variable de entorno
const router = express.Router();
const db = require('../database/db');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], async (err, user) => {
    if (err) {
      return res.status(500).send({ error: 'Error interno del servidor' });
    }
    if (!user) {
      return res.status(401).send({ error: 'Usuario no encontrado' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send({ error: 'Contraseña incorrecta' });
    }
  });
});

module.exports = router;
