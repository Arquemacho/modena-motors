// routes/vehicles.js
import express from 'express';
import db from '../database/db.js';
const router = express.Router();
import multer from 'multer';
import path from 'path';
// Configuración de multer para vehículos
const storageVehicles = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/vehicles/');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id || Date.now()}-${file.originalname}`);
  }
});

const uploadVehicles = multer({ storage: storageVehicles });

router.get('/', (req, res) => {
	db.all('SELECT * FROM vehicles', [], (err, vehicles) => {
	  if (err) {
		console.error(err.message);
		res.status(500).json({ error: 'Error al obtener vehículos' });
	  } else {
		res.json({ vehicles });
	  }
	});
  });
  

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM vehicles WHERE id = ?', [req.params.id], (err, vehicle) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al obtener el vehículo' });
    }
    if (vehicle) {
      res.json({ vehicle });
    } else {
      res.status(404).json({ message: 'Vehicle not found' });
    }
  });
});

// Agregar un vehículo
router.post('/', uploadVehicles.single('image'), (req, res) => {
  const { brand_id, category_id, model, year, price, description } = req.body;
  const imageURL = req.file ? `/uploads/vehicles/${req.file.filename}` : null;

  db.run(
    'INSERT INTO vehicles (brand_id, category_id, model, year, price, description, imageURL) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [brand_id, category_id, model, year, price, description, imageURL],
    function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error al añadir vehículo' });
      }
      res.status(201).json({ id: this.lastID, brand_id, category_id, model, year, price, description, imageURL });
    }
  );
});

// Update vehicle route
router.put('/:id', uploadVehicles.single('image'), (req, res) => {
  const { brand_id, category_id, model, year, price, description } = req.body;
  
  // If no new image file is uploaded, use the existing image URL from the request body
  let imageURL = req.body.imageURL || '';

  // If there is a new file, update the imageURL to the path of the uploaded file
  if (req.file) {
    imageURL = `/uploads/vehicles/${req.file.filename}`;
  }

  const sql = 'UPDATE vehicles SET brand_id = ?, category_id = ?, model = ?, year = ?, price = ?, description = ?, imageURL = ? WHERE id = ?';
  const params = [brand_id, category_id, model, year, price, description, imageURL, req.params.id];

  db.run(sql, params, function(err) {
    if (err) {
      console.error('Error updating vehicle:', err.message);
      return res.status(500).json({ error: 'Error updating vehicle' });
    }
    res.json({ message: 'Vehicle updated successfully', changes: this.changes, imageURL });
  });
});


router.delete('/:id', (req, res) => {
  db.run('DELETE FROM vehicles WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error al eliminar vehículo' });
    }
    res.json({ message: 'Vehicle deleted', changes: this.changes });
  });
});

export default router;
