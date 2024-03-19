const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Importar rutas
const usersRouter = require('./routes/users');
const vehiclesRouter = require('./routes/vehicles');
const employeesRouter = require('./routes/employees');

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/users', usersRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/employees', employeesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

