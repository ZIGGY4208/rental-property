// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../data/useAdminAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    console.log("Access denied, not logged in");
    return <Navigate to="/Admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
