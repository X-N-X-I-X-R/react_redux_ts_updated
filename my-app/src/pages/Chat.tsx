import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Grid, Typography } from '@mui/material';
import ChatRoomList from '../components/ChatRoomList';
import ChatRoom from '../components/ChatRoom';

const Chat: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" component="h1" gutterBottom>
        Chat Application
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChatRoomList />
        </Grid>
        <Grid item xs={12} md={8}>
          <Routes>
            <Route path="/" element={<Typography>Select a room to start chatting</Typography>} />
            <Route path=":roomName" element={<ChatRoom />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
