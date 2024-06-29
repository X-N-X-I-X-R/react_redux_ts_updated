import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { login, setAuthenticated } from '../store/slicers/authSlice';
import { RootState } from '../store/rootReducer';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import jwt_decode from 'jwt-decode'; 

export interface DecodedToken {
  user_profile_id: number;
  user_Profile_id: string; 
  user_id: number;
  user_nickname: string;
  exp: number;
  created_token_time: number;
  email: string;
  groups: string[];
  iat: number;
  id: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  iss: string;
  jti: string;
  last_login: string;
  time_to_expired: number;
  token_type: string;
  username: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const response = await dispatch(login({ username, password }));

  if (response.payload.access) {
    sessionStorage.setItem('access_token', response.payload.access);
    sessionStorage.setItem('refresh_token', response.payload.refresh);

    try {
      const token = sessionStorage.getItem('access_token');
      if (!token) throw new Error('Token not found');

      const decodedToken: DecodedToken = jwt_decode(token);
      console.log(decodedToken);

      sessionStorage.setItem('user_id', decodedToken.user_id.toString());
      sessionStorage.setItem('user_nickname', decodedToken.user_nickname);

      if (decodedToken && decodedToken.user_profile_id !== undefined) {
        sessionStorage.setItem('user_Profile_id', decodedToken.user_profile_id.toString());
      } else {
        console.error('decodedToken or user_Profile_id is undefined');
      }

      dispatch(setAuthenticated(true));
      navigate('/');
    } catch (error: any) {
      console.error('Error decoding token:', error.message);
    }
  }
};



  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>Login</Button>
              {error && <p>{error}</p>}
            </Form>
            <Link to="/Autpage">
              <Button variant="secondary" className="mt-3">Back </Button>
            </Link>
          </Col>
        </Row>
      </Typography>
    </Container>
  );
};

export default Login;
