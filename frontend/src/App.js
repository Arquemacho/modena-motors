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
import './styles/App.css';
import PrivateRoute from './components/PrivateRoute';

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
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} /> {/* Esta ruta captura cualquier URL no definida */}
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
};

export default App;
