import { Navigate } from "react-router-dom";
import { useAuth } from "./authContexts";

const ProtectedRoute = ({ children }) => {
  const authContext = useAuth();

  // Context not ready
  if (!authContext) return null;

  const { userLoggedIn, loading } = authContext;

  // Wait until auth state is resolved
  if (loading) return null;

  // Not logged in → redirect
  if (!userLoggedIn) {
    return <Navigate to="/login-signup" replace />;
  }

  // Logged in → allow access
  return children;
};

export default ProtectedRoute;
