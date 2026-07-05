import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.isAuthenticated && !auth.isLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
