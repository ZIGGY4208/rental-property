import React, { useState } from "react";
import AdminAuthContext from "../data/AdminAuthContext";
// import AdminAuthContext from "../../context/AdminAuthContext"; // adjust path if needed

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log("Admin logged out");
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
