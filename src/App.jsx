import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Routes from "./routes";
import { NavLink } from "react-router-dom";

export default function App() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" variant="light" style={{ background: "#E4DACE" }}>
        <Container>
          <Link to="/" className="text-decoration-none navbar-brand">
            HOME
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Link to="/surah" className="text-decoration-none text-dark nav-link">
                Baca Quran
              </Link>
              <Link to="/jadwal-sholat" className="text-decoration-none text-dark nav-link">
                Jadwal Shalat
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes />
    </>
  );
}
