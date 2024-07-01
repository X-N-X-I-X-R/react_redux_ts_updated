import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ButtonBase } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      className="Sidebar"
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: 8,
          backgroundColor: '#000', // Drawer background to black
          
        },
      }}
    >
      <List>
        <ButtonBase onClick={() => navigate('/UserProfile')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549', 
              fontFamily:'fantasy',// Change background on hover
            },
            '.MuiListItemText-primary': {
              color: 'white', // Text color to white
              
            }
          }}>
            <ListItemIcon><HomeIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="UserProfile" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/about')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><InfoIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/contact')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><ContactMailIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/dashboard')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><LoginIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/chat')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><ChatIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/videoChat')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><VideoCallIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Video Chat" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/secFilings')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><SearchIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="SEC Filings" />
          </ListItem>
        </ButtonBase>
        <ButtonBase onClick={() => navigate('/mediaPage')}>
          <ListItem sx={{
            '&:hover': {
              backgroundColor: '#F58549',
            },
            '.MuiListItemText-primary': {
              color: 'white',
            }
          }}>
            <ListItemIcon><ImageIcon style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText primary="Media Page" />
          </ListItem>
        </ButtonBase>
      </List>
    </Drawer>
  );
};

export default Sidebar;