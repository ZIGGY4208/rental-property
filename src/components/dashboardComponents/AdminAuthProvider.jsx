import React, { useState, useEffect } from "react";
import AdminAuthContext from "../data/AdminAuthContext"; 
import { getUserByEmail, setCurrentAdmin, getCurrentAdmin } from "../data/localStorageUtils";

export const AdminAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check admin session on component mount
  useEffect(() => {
    const user = getCurrentAdmin(); // ✅ use separate admin key
    if (!user) return;

    const isAdmin =
      user &&
      (user.role === "superadmin" ||
        user.role === "admin" ||
        (user.profile && (user.profile.role === "superadmin" || user.profile.role === "admin")));

    if (isAdmin) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      console.log("💡 Admin logged in as:", user.email);
    } else {
      localStorage.removeItem("currentAdmin"); // ✅ remove only admin key
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Login function for admin/superadmin
  const login = (user) => {
    setCurrentAdmin(user.email); // ✅ set only admin key
    setCurrentUser(user);
    setIsAuthenticated(true);
    console.log("✅ Admin logged in as:", user.email);
  };

  // Logout function for admin/superadmin
  const logout = () => {
    localStorage.removeItem("currentAdmin"); // ✅ remove only admin key
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
