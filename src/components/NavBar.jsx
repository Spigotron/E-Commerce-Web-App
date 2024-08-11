import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import '../App.css'; 

function NavBar() {
    const navigate = useNavigate();
  return (
    <Navbar bg="success" data-bs-theme="dark"  >
        <Container className='ms-0'>
          <Navbar.Brand as={Link} to='/'>E-Commerce Web App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to='/customers'>All Customers</Nav.Link>
            <Nav.Link as={Link} to='/find-customer'>Find Customer</Nav.Link>
            <Nav.Link as={Link} to='/add-customer'>Add Customer</Nav.Link>
            <Nav.Link as={Link} to='/orders'>All Orders</Nav.Link>
            <Nav.Link as={Link} to='/find-order'>Find Order</Nav.Link>
            <Nav.Link as={Link} to='/add-order'>Add Order</Nav.Link>
            <Nav.Link as={Link} to='/products'>All Products</Nav.Link>
            <Nav.Link as={Link} to='/find-product'>Find Product</Nav.Link>
            <Nav.Link as={Link} to='/add-product'>Add Product</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar