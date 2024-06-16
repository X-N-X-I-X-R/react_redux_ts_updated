// src/components/Userprofile.tsx 
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Userprofile: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2>User Profile</h2>
          <p>This is the user profile page. You can put any content you want here.</p>
          <Link to="/homepage">
            <Button variant="primary" className="mr-2">Back to Homepage</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Userprofile;