import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userType, setUserType] = useState(localStorage.getItem("userType") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Keep localStorage in sync with state
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    if (userType) localStorage.setItem("userType", userType);
    else localStorage.removeItem("userType");
  }, [token, userType]);

  const login = (token, userType) => {
    setToken(token);
    setUserType(userType);
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ token, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}