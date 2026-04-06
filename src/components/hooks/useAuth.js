// src/hooks/useAuth.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure token is stored on login
      if (!token) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCurrentUser(response.data);
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return { currentUser, loading, refetch: fetchCurrentUser };
};
