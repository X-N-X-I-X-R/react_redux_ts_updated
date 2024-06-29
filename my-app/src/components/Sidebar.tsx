import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import Chaticon from '@mui/icons-material/Chat';
import Videocall from '@mui/icons-material/VideoCall';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';
import SeachIcon from '@mui/icons-material/Search';
import ImageIcon from '@mui/icons-material/Image';

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
        <ButtonBase onClick={() => navigate('/UserProfile')}>
          <ListItem>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="UserProfile" />
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
                <ButtonBase onClick={() => navigate('/chat')}>
          <ListItem>
            <ListItemIcon><Chaticon /></ListItemIcon>
            <ListItemText primary="chat" />
          </ListItem>
        </ButtonBase>
         <ButtonBase onClick={() => navigate('/videoChat')}>
          <ListItem>
            <ListItemIcon><Videocall /></ListItemIcon>
            <ListItemText primary="videoChat" />
          </ListItem>
        </ButtonBase>
                 <ButtonBase onClick={() => navigate('/secFilings')}>
          <ListItem>
            <ListItemIcon><SeachIcon/></ListItemIcon>
            <ListItemText primary="secFiling" />
          </ListItem>
        </ButtonBase>
                
                 <ButtonBase onClick={() => navigate('/images')}>
          <ListItem>
            <ListItemIcon><ImageIcon/></ListItemIcon>
            <ListItemText primary="images" />
          </ListItem>
        </ButtonBase>
        
      </List>
    </Drawer>
  );
};

export default Sidebar;
