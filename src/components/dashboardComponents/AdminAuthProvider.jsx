import React, { useState, useEffect } from "react";
import AdminAuthContext from "../data/AdminAuthContext";
import { getCurrentUser } from "../data/localStorageUtils"; // ✅ make sure path is correct

export const AdminAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check localStorage on load
  useEffect(() => {
    const user = getCurrentUser();
    if (user && (user.role === "admin" || user.role === "superadmin")) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      console.log("💡 Logged in as:", user.email);
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // ✅ Login (called from AdminLogin.jsx)
  const login = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    console.log("✅ Logged in as:", user.email);
  };

  // ✅ Logout (clears data)
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsAuthenticated(false);
    console.log("🚪 Admin logged out");
  };

  return (
    <AdminAuthContext.Provider value={{ currentUser, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
