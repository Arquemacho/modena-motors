// backend/routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // Importa dotenv para manejar el archivo .env
const router = express.Router();
const db = require('../database/db');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verifica si las credenciales coinciden con las del archivo .env
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Si las credenciales son válidas, genera un token
    const token = jwt.sign({ username: "admin", role: "admin" }, SECRET_KEY, { expiresIn: '1h' });
    console.log("Token generado:", token);
    return res.json({ token });
  } else {
    // Si las credenciales no son válidas, devuelve un error
    console.log("Credenciales incorrectas");
    return res.status(401).send({ error: 'Credenciales incorrectas' });
  }
});

module.exports = router;
