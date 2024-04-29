const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Importar rutas
const usersRouter = require('./routes/users');
const vehiclesRouter = require('./routes/vehicles');
const employeesRouter = require('./routes/employees');
const authRouter = require('./routes/authRoutes'); // Importa el router de autenticación

// Middlewares
app.use(express.json());
app.use(cors()); // Middleware para configurar CORS

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/auth', authRouter); // Usa el router de autenticación en la ruta '/api/auth'

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
