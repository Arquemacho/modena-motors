const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simula una base de datos de usuarios
const users = [{ username: 'admin', password: 'password123' }];

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username: user.username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
});

module.exports = router;
