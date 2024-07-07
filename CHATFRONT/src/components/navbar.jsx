import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./navbar.module.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function userheader() {
  const { isAutenticated, logout } = useAuth();
  const usernombre = localStorage.getItem("nombre");
  const handleLogout = () => {
    logout();
  };
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isregistrar = location.pathname === "/registrar";
  return (
    <ul>
      {isAutenticated ? (
        <>
          <Navbar
            className={`bg-body-tertiary ${styles.barra}`}
            data-bs-theme="dark"
          >
            <Container>
              <Navbar.Brand onClick={handleLogout}>
                <Link className={`${styles.login} ${styles.linkedoff}`} to="/">
                  <p> LOGOUT</p>
                </Link>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>{"LOGEADO COMO: " + usernombre}</Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      ) : (
        <>
          <Nav
            variant="tabs"
            defaultActiveKey="/home"
            className={`bg-body-tertiary ${styles.barra}`}
            data-bs-theme="dark"
          >
            <Nav.Item>
              <Link
                className={`${styles.login} ${
                  isHome ? styles.linked : styles.linkedoff
                }`}
                to="/"
              >
                Login
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                className={isregistrar ? styles.linked : styles.linkedoff}
                to="/registrar"
              >
                Registrar
              </Link>
            </Nav.Item>
          </Nav>
        </>
      )}
    </ul>
  );
}

export default userheader;
