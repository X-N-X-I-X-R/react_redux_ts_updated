import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../store/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/rootReducer';
import { fetchChatRooms, createChatRoom } from '../store/slicers/chatSlice';
import { AppDispatch } from '../store';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';

const ChatRoomList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const chatRooms = useSelector((state: RootState) => state.chat.rooms);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Dispatching fetchChatRooms');
    dispatch(fetchChatRooms());
  }, [dispatch]);

  const handleCreateRoom = () => {
    const roomName = prompt("Enter room name:");
    if (roomName) {
      console.log('Dispatching createChatRoom with name:', roomName);
      dispatch(createChatRoom(roomName)).then(() => {
        navigate(`/chat/${roomName}`);
      });
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Chat Rooms
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCreateRoom}>
        Create Room
      </Button>
      <List>
        {chatRooms.length === 0 ? (
          <Typography>No chat rooms available</Typography>
        ) : (
          chatRooms.map((room) => (
            <ListItem button key={room.id} component={Link} to={`/chat/${room.name}`}>
              <ListItemText primary={room.name} />
            </ListItem>
          ))
        )}
      </List>
    </div>
  );
};

export default ChatRoomList;
