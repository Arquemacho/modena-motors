const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../database/db');
const SECRET_KEY = "tu_clave_secreta"; // Deberías almacenarla en una variable de entorno

// Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    const params = [req.body.username, hashedPassword, req.body.role];
    db.run(sql, params, function(err) {
      if (err) {
        res.status(500).send({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
  } catch {
    res.status(500).send();
  }
});

// Login de usuario
router.post('/login', (req, res) => {
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [req.body.username], async (err, user) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
        res.json({ token: token });
      } else {
        res.status(401).send({ error: 'Contraseña incorrecta' });
      }
    } else {
      res.status(404).send({ error: 'Usuario no encontrado' });
    }
  });
});

module.exports = router;
