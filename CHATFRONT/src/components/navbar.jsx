import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./navbar.module.css";

import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";

function userheader() {
  const { isAutenticated, logout, loading } = useAuth();
  const usernombre = localStorage.getItem("name");
  const handleLogout = () => {
    logout();
  };
  if (isAutenticated) {
    return (
      <Navbar
        className={`bg-body-tertiary ${styles.barra}`}
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="/" onClick={handleLogout}>
            LOGOUT
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{"LOGEADO COMO: " + usernombre}</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  if (!loading) {
    return (
      <Navbar
        className={`bg-body-tertiary ${styles.barra}`}
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/registrar">Registrar</Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
export default userheader;
