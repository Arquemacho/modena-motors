import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Intenta recuperar el token de las cookies al cargar
    const tokenFromCookie = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (tokenFromCookie) {
      setToken(tokenFromCookie.split('=')[1]);
    }
  }, []);

  const setAuthData = (newToken) => {
    setToken(newToken);
    document.cookie = `token=${newToken}; path=/; max-age=3600; secure; httponly; SameSite=Strict`;
  };

  const logout = () => {
    setToken(null);
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  return (
    <AuthContext.Provider value={{ token, setAuthData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
