import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAutenticated, logout } = useAuth();

  return (
    <nav>
      <h1>Task Manager</h1>
      <ul>
        {isAutenticated ? (
          <>
            <li>
              <Link to="/login" onClick={() => logout()}>
                logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">login</Link>
            </li>
            <li>
              <Link to="/registrar">Registrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
export default Navbar;
