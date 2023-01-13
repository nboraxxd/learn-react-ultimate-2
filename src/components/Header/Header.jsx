import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleClickLogInBtn = () => {
    navigate('/log-in')
  }

  const handleClickSignUpBtn = () => {
    navigate('/sign-up')
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink to={`/`} className="navbar-brand">
          PRO QUIZZZ
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={`/`} className="nav-link">
              Home
            </NavLink>
            <NavLink to={`/users`} className="nav-link">
              User
            </NavLink>
            <NavLink to={`/admins`} className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            <button className="nav-btn btn-login" onClick={handleClickLogInBtn}>
              Log in
            </button>
            <button className="nav-btn btn-signup" onClick={handleClickSignUpBtn}>
              Sign up
            </button>
            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item>Log in</NavDropdown.Item>
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Log out</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
