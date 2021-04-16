import {Navbar,Nav} from 'react-bootstrap'
import React from 'react'
import './header.css';
function Header(){
return (
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Login As</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/loginstudent">Student</Nav.Link>
        <Nav.Link href="/loginteacher">Teacher</Nav.Link>
        <Nav.Link href="/loginadministrator">Admin</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
};
export default Header;