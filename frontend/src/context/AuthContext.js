import React, { createContext, useState, useEffect, useContext } from 'react';

// Crea el contexto de autenticación
export const AuthContext = createContext({
	authData: null,
	login: () => {},
	logout: () => {}
  });
  
  // Este es el hook personalizado que puedes utilizar para acceder al contexto de autenticación.
  export const useAuth = () => useContext(AuthContext);

// Componente proveedor que envuelve tu aplicación en App.js
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authData')));

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuthData(data);
        localStorage.setItem('authData', JSON.stringify(data)); // Guarda los datos de autenticación en el almacenamiento local
        return true;
      } else {
        throw new Error(data.error || 'No se pudo iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData'); // Elimina los datos de autenticación del almacenamiento local
  };

  // Efecto para verificar la sesión al cargar la aplicación
  useEffect(() => {
    // Lógica para validar la sesión existente aquí
    // Por ejemplo, podrías verificar si hay un token válido en authData
    // y si no es válido o no existe, entonces podrías limpiarlo:
    if (authData && !isTokenValid(authData.token)) {
      logout();
    }
  }, [authData]);

  // Valor del contexto
  const authContextValue = {
    authData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Función auxiliar para validar el token
const isTokenValid = (token) => {
  // Implementa la lógica de validación del token aquí
  // Esto podría incluir decodificar el token y verificar su expiración
  return true; // o false si el token no es válido
};
