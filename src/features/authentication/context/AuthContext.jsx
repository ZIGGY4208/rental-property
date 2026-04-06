import { createContext, useEffect, useState } from "react";
import { loginUser, getCurrentUser } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* ===============================
     CHECK AUTH WHEN APP LOADS
  =============================== */

useEffect(() => {
  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      const res = await getCurrentUser();

      const currentUser = res.data.user;

      setUser(currentUser);

      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (error) {
      console.error("❌ Auth check failed:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  checkAuth();
}, []);

  /* ===============================
     LOGIN
  =============================== */

  const login = async (credentials) => {
    console.log("🔐 AuthContext login called");

    const res = await loginUser(credentials);

    const { user, token } = res.data;

    console.log("👤 User:", user);
    console.log("🔑 Token:", token);

    setUser(user);
    setToken(token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  };

  /* ===============================
     LOGOUT
  =============================== */

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  /* ===============================
     CONTEXT PROVIDER
  =============================== */

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
