import express from 'express';
import cors from 'cors';
import path from 'path';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Construct __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta de la base de datos
const dbPath = path.join(__dirname, 'database', 'modenaMotors.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to the database', err);
    } else {
        console.log('Connected to the database');
    }
});

db.serialize(() => {
    // Crear las tablas necesarias
    db.run(`CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone TEXT NOT NULL,
        vipStatus BOOLEAN NOT NULL DEFAULT FALSE
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS brands (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        price DECIMAL NOT NULL,
        description TEXT,
        imageURL TEXT,
        FOREIGN KEY (brand_id) REFERENCES brands(id),
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        timeInCompany INTEGER NOT NULL,
        imageURL TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS contact_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        message TEXT NOT NULL,
        attended BOOLEAN DEFAULT FALSE,
        priority BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (client_id) REFERENCES clients(id)
    )`);

    console.log('Tablas creadas con éxito');
});

// Importar rutas
import clientsRouter from './routes/clients.js';
import vehiclesRouter from './routes/vehicles.js';
import employeesRouter from './routes/employees.js';
import authRouter from './routes/authRoutes.js';
import brandsRouter from './routes/brands.js';
import categoriesRouter from './routes/categories.js';
import contactRouter from './routes/contact.js';

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/clients', clientsRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/auth', authRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/contact', contactRouter);

// Configurar el proxy para el chatbot
app.use('/api/chatbot', (req, res, next) => {
    console.log('Proxying request to chatbot:', req.method, req.url);
    next();
}, createProxyMiddleware({
    target: 'http://192.168.1.12:3000', // IP del segundo computador
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        console.log('Request headers:', proxyReq.getHeaders());
    },
    onProxyRes: (proxyRes, req, res) => {
        console.log('Response headers:', proxyRes.headers);
    },
    logLevel: 'debug' // Añadir más detalles de depuración
}));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
