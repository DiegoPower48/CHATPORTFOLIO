import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./navbar.module.css";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";

function userheader() {
  const { isAutenticated, logout } = useAuth();
  const usernombre = localStorage.getItem("nombre");
  const handleLogout = () => {
    logout();
  };

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
                <Link className={styles.linked} to="/">
                  LOGOUT
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
              <Nav.Link eventKey="link-2" className={styles.links}>
                <Link className={styles.linked} to="/">
                  Login
                </Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1">
                <Link className={styles.linked} to="/registrar">
                  Registrar
                </Link>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </>
      )}
    </ul>
  );
}

export default userheader;
