import React, { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 Check token on app load
  useEffect(() => {
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");

    if (token) {
      console.log("🔐 Token found on load:", token);
      setIsAuthenticated(true);

      // OPTIONAL: you can decode token later
      // for now we trust it
    } else {
      console.log("⛔ No token found");
    }

    setLoading(false);
  }, []);

  // ✅ LOGIN
  const login = (token, user) => {
    console.log("🧠 Setting auth state...");
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  // ✅ LOGOUT
  const logout = () => {
    console.log("🚪 Logging out...");
    setCurrentUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
