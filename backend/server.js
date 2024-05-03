const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3001;

// Ruta de la base de datos
const dbPath = path.join(__dirname, 'database', 'modenaMotors.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Tabla de clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL,
      vipStatus BOOLEAN NOT NULL DEFAULT FALSE
    )
  `);

  // Tabla de vehículos
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      price DECIMAL NOT NULL,
      description TEXT,
      imageURL TEXT
    )
  `);

  // Tabla de empleados
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      timeInCompany INTEGER NOT NULL,
      imageURL TEXT
    )
  `);

  console.log('Tablas creadas con éxito');
});

db.close();

// Middlewares
app.use(express.json());
app.use(cors());

// Importar rutas
const clientsRouter = require('./routes/clients');
const vehiclesRouter = require('./routes/vehicles');
const employeesRouter = require('./routes/employees');
const authRouter = require('./routes/authRoutes');

app.use('/api/clients', clientsRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
