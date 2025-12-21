import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../data/useAdminAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, currentUser, loading } = useAdminAuth();

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/Admin" replace />;

  const role = currentUser?.role;

  if (role !== "admin" && role !== "superadmin")
    return <Navigate to="/Admin" replace />;

  return children;
};

export default ProtectedRoute;
