import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default UserProtectedRoute;
