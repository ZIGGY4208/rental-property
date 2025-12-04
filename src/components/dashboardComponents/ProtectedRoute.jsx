import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../data/useAdminAuth"; // path is correct

const ProtectedRoute = ({ children }) => {
  const { currentUser, isAuthenticated } = useAdminAuth();

  // ✅ Check authentication and roles
  const isAdmin =
    currentUser &&
    (currentUser.role === "admin" ||
      currentUser.role === "superadmin" ||
      (currentUser.profile && 
       (currentUser.profile.role === "admin" || currentUser.profile.role === "superadmin")));

  if (!isAuthenticated || !isAdmin) {
    console.log("Access denied, not logged in or not an admin");
    return <Navigate to="/Admin" replace />;
  }

  return children;
};

export default ProtectedRoute;
