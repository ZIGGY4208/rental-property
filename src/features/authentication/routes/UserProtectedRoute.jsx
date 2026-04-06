import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait until auth check finishes
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no logged-in user redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Allow access
  return children;
};

export default UserProtectedRoute;
