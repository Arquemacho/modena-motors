// db.js
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Set the path to the database file
const pathToDb = path.join(__dirname, 'modenaMotors.db');

// Connect to the SQLite database
const db = new sqlite3.Database(pathToDb, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

export default db;
