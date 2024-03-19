const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Obtener la lista de empleados
router.get('/', (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.json({ rows });
  });
});

// Añadir un nuevo empleado
router.post('/', (req, res) => {
  const { name, position, timeInCompany, imageURL } = req.body;
  const sql = `INSERT INTO employees (name, position, timeInCompany, imageURL) 
               VALUES (?, ?, ?, ?)`;
  const params = [name, position, timeInCompany, imageURL];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// Actualizar la información de un empleado
router.put('/:id', (req, res) => {
  const { name, position, timeInCompany, imageURL } = req.body;
  db.run(
    `UPDATE employees SET name = ?, position = ?, timeInCompany = ?, imageURL = ? WHERE id = ?`,
    [name, position, timeInCompany, imageURL, req.params.id],
    function(err) {
      if (err) {
        res.status(400).send({ error: res.message });
        return;
      }
      res.json({ message: "success", changes: this.changes });
    }
  );
});

// Eliminar un empleado
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM employees WHERE id = ?',
    req.params.id,
    function(err) {
      if (err) {
        res.status(400).send({ error: res.message });
        return;
      }
      res.json({ message: "deleted", changes: this.changes });
    }
  );
});

module.exports = router;
