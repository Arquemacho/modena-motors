import express from 'express';
import db from '../database/db.js';
const router = express.Router();

// Obtener todos los usuarios con manejo de errores mejorado
router.get('/', (req, res) => {
  db.all('SELECT * FROM users', [], (err, users) => {
    if (err) {
      console.error(`Error al obtener usuarios: ${err.message}`); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al obtener usuarios' }); // Enviar respuesta en JSON
    }
    res.json({ users });
  });
});

// Añadir un nuevo usuario con manejo de errores mejorado
router.post('/', (req, res) => {
  const { username, password, role } = req.body;
  db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], function(err) {
    if (err) {
      console.error(`Error al añadir usuario: ${err.message}`); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al añadir usuario' }); // Enviar respuesta en JSON
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Actualizar un usuario existente con manejo de errores mejorado
router.put('/:id', (req, res) => {
  const { username, password, role } = req.body;
  db.run('UPDATE users SET username = ?, password = ?, role = ? WHERE id = ?', [username, password, role, req.params.id], function(err) {
    if (err) {
      console.error(`Error al actualizar usuario: ${err.message}`); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al actualizar usuario' }); // Enviar respuesta en JSON
    }
    res.json({ message: 'Usuario actualizado', changes: this.changes });
  });
});

// Eliminar un usuario con manejo de errores mejorado
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(`Error al eliminar usuario: ${err.message}`); // Loguear el error en el servidor
      return res.status(500).json({ error: 'Error al eliminar usuario' }); // Enviar respuesta en JSON
    }
    res.json({ message: 'Usuario eliminado', changes: this.changes });
  });
});

export default router;
