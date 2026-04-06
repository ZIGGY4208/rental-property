import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthProvider";

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, currentUser, loading } = useAdminAuth();

  console.log("🔐 ProtectedRoute check:");
  console.log("isAuthenticated:", isAuthenticated);
  console.log("currentUser:", currentUser);

  if (loading) {
    console.log("⏳ Still loading...");
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("⛔ Not authenticated → redirecting");
    return <Navigate to="/Admin" replace />;
  }

  const role = currentUser?.role;

  if (role !== "admin") {
    console.log("⛔ Not admin → redirecting");
    return <Navigate to="/Admin" replace />;
  }

  console.log("✅ Access granted");
  return children;
};

export default AdminProtectedRoute;
