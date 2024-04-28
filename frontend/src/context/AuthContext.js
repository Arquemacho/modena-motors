import React, { createContext, useState } from 'react';

const AuthContext = createContext({
  token: null,
  setAuthData: () => {}
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const setAuthData = (token) => {
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
