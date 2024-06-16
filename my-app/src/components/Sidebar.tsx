import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      className="Sidebar"
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: 10,
        },
      }}
    >
      <List>
        <ButtonBase onClick={() => navigate('/userprofile')}>
          <ListItem>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="User Profile" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/about')}>
          <ListItem>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/contact')}>
          <ListItem>
            <ListItemIcon><ContactMailIcon /></ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/dashboard')}>
          <ListItem>
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </ButtonBase>
      </List>
    </Drawer>
  );
};

export default Sidebar;
