import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import VehiclesGridPage from './pages/VehiclesGridPage';
import EmployeesPage from './pages/EmployeesPage'; // Asegúrate de que el nombre del archivo y el import sean correctos.
import AdminLogin from './pages/AdminLogin'; // Importa AdminLogin si es necesario.
import AdminPanel from './pages/AdminPanel'; // Importa AdminPanel si es necesario.
import NotFoundPage from './pages/NotFoundPage'; // Importa NotFoundPage si es necesario.
import PrivateRoute from './components/PrivateRoute';
import ManageVehicles from './components/admin/ManageVehicles';
import ManageEmployees from './components/admin/ManageEmployees';
import ManageClients from './components/admin/ManageClients';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/vehicles" element={<VehiclesGridPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="/admin/vehicles" element={<PrivateRoute><ManageVehicles /></PrivateRoute>} />
          <Route path="/admin/employees" element={<PrivateRoute><ManageEmployees /></PrivateRoute>} />
          <Route path="/admin/clients" element={<PrivateRoute><ManageClients /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} /> {/* Esta ruta captura cualquier URL no definida */}
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
