import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import VehiclesPage from './pages/VehiclesPage';
import EmployeePage from './pages/EmployeesPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/employees" element={<EmployeePage />} />
        {/* Añade aquí tus otras rutas */}
      </Routes>
      </AuthProvider>
      <Footer />
    </Router>
  );
};

export default App;
