import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

interface NavbarProps {
  nickname?: string;
}

const Navbar: React.FC<NavbarProps> = ({ nickname }) => {
  return (
    <AppBar position="fixed" className="Navbar" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {nickname && (
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              {nickname}
            </Typography>
          )}
          <Button color="inherit">
            <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
              About
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/contact" style={{ color: 'white', textDecoration: 'none' }}>
              Contact
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Login
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;