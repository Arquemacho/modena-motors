const sqlite3 = require('sqlite3').verbose();
const dbName = 'modenaMotors.db';
const db = new sqlite3.Database(dbName);

db.serialize(() => {
  // Crear tabla de usuarios
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);

  // Crear tabla de vehículos
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

  // Crear tabla de empleados
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
