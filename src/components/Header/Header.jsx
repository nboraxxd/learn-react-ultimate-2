import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, Link } from 'react-router-dom'
import './Header.scss'

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          Bora
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/users">
              User
            </NavLink>
            <NavLink className="nav-link" to="admins">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Log in</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
