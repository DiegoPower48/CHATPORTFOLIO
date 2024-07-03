import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoutes() {
  const { loading, isAutenticated } = useAuth();

  if (loading) {
    return <h1>Loading.....</h1>;
  }
  if (!isAutenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
