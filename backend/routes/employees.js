// routes/employees.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../database/db');
const path = require('path');

// Configuración de multer para empleados
const storageEmployees = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/employees/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id || Date.now()}-${file.originalname}`);
  }
});

const uploadEmployees = multer({ storage: storageEmployees });

router.get('/', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, employees) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener empleados' });
    }
    res.json({ employees });
  });
});

router.post('/', uploadEmployees.single('image'), (req, res) => {
  const { name, position, timeInCompany } = req.body;
  const imageURL = req.file ? `/uploads/employees/${req.file.filename}` : null;

  db.run(
    'INSERT INTO employees (name, position, timeInCompany, imageURL) VALUES (?, ?, ?, ?)',
    [name, position, timeInCompany, imageURL],
    function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error al añadir empleado' });
      }
      res.status(201).json({ id: this.lastID, name, position, timeInCompany, imageURL });
    }
  );
});

router.put('/:id', uploadEmployees.single('image'), (req, res) => {
  const { name, position, timeInCompany } = req.body;
  const imageURL = req.file ? `/uploads/employees/${req.file.filename}` : null;

  const sql = 'UPDATE employees SET name = ?, position = ?, timeInCompany = ?, imageURL = ? WHERE id = ?';
  const params = [name, position, timeInCompany, imageURL, req.params.id];

  db.run(sql, params, function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al actualizar empleado' });
    }
    res.json({ message: 'Empleado actualizado', changes: this.changes });
  });
});

router.delete('/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al eliminar empleado' });
    }
    res.json({ message: 'Empleado eliminado', changes: this.changes });
  });
});

module.exports = router;
