import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import styles from "./protected.module.css";

function ProtectedRoutes() {
  const { loading, isAutenticated } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  if (!isAutenticated && !loading) {
    return (
      <div className={styles.loading}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Navigate to="/" replace />;
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoutes;
