const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Obtener la lista de empleados con manejo de errores mejorado
router.get('/', (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      console.error(`Error al obtener empleados: ${err.message}`); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al obtener empleados' }); // Enviar respuesta en JSON
    }
    res.json({ employees: rows }); // Asegúrate de enviar la respuesta en JSON con una clave clara
  });
});

// Añadir un nuevo empleado con manejo de errores mejorado
router.post('/', (req, res) => {
  const { name, position, timeInCompany, imageURL } = req.body;
  const sql = `INSERT INTO employees (name, position, timeInCompany, imageURL) VALUES (?, ?, ?, ?)`;
  const params = [name, position, timeInCompany, imageURL];
  db.run(sql, params, function(err) {
    if (err) {
      console.error(`Error al añadir empleado: ${err.message}`); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al añadir empleado' }); // Enviar respuesta en JSON
    }
    res.json({ id: this.lastID }); // Enviar respuesta en JSON
  });
});

// Actualizar la información de un empleado con manejo de errores mejorado
router.put('/:id', (req, res) => {
  const { name, position, timeInCompany, imageURL } = req.body;
  db.run(
    `UPDATE employees SET name = ?, position = ?, timeInCompany = ?, imageURL = ? WHERE id = ?`,
    [name, position, timeInCompany, imageURL, req.params.id],
    function(err) {
      if (err) {
        console.error(`Error al actualizar empleado: ${err.message}`); // Loguear el error en el servidor
        return res.status(400).json({ error: 'Error al actualizar empleado' }); // Enviar respuesta en JSON
      }
      res.json({ message: "Empleado actualizado", changes: this.changes });
    }
  );
});

// Eliminar un empleado con manejo de errores mejorado
router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM employees WHERE id = ?',
    req.params.id,
    function(err) {
      if (err) {
        console.error(`Error al eliminar empleado: ${err.message}`); // Loguear el error en el servidor
        return res.status(400).json({ error: 'Error al eliminar empleado' }); // Enviar respuesta en JSON
      }
      res.json({ message: "Empleado eliminado", changes: this.changes });
    }
  );
});

module.exports = router;
