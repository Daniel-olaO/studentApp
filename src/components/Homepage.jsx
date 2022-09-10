import {React} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import Cookies from 'universal-cookie';
import {Outlet} from 'react-router-dom';
import '../App.css';

const Homepage = ({setIsLoggedIn}) => {
  function logOut() {
    const cookies = new Cookies();
    localStorage.removeItem('username');
    cookies.remove('token');
    setIsLoggedIn(false);
  }
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Students - App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home/students">Students</Nav.Link>
              <Nav.Link href="/home/courses">Courses</Nav.Link>
              <NavDropdown
                title={localStorage.getItem('username')}
                id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logOut}>LogOut</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};


export default Homepage;
