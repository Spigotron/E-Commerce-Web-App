import React from 'react';
import { Container, Row } from 'react-bootstrap';
import NavBar from './NavBar';
import '../App.css';

function Home() {
  return (
    <div>
        <NavBar />
        <Row className='home-page'>
          <Container className='w-75'>
            <h1>Welcome to the E-Commerce Web App!</h1>
          </Container>
        </Row>
    </div>
  )
}

export default Home