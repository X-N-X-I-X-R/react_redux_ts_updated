// src/components/Homepage.tsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Autpage: React.FC = () => {
  return (
    <Container>

      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>Welcome to our application</h2>
          <p>This is the homepage. You can put any content you want here.</p>
          <Link to="/login">
            <Button variant="primary" className="mr-2">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Autpage;