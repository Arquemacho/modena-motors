const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Cambiar 'pathToDb' por la ruta al archivo de tu base de datos
const pathToDb = path.join(__dirname, 'modenaMotors.db');

let db = new sqlite3.Database(pathToDb, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
  }
});

module.exports = db;
