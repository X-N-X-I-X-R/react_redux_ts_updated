import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { logout } from '../store/slicers/authSlice'; // Corrected import path

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // move to the login page
    window.location.href = '/Autpage';
  }

  return (
    <Button variant="contained" onClick={handleLogout} style={{ backgroundColor: '#f58549' }}>
      Logout
    </Button>
  );
};

export default LogoutButton;