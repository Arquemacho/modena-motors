const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Importar rutas
const userRoutes = require('./routes/users');
const vehicleRoutes = require('./routes/vehicles');
const employeeRoutes = require('./routes/employees');

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
