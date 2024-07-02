import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../store/hooks';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/rootReducer';
import { connect, disconnect, receiveMessage, sendMessage, updateUsers } from '../store/slicers/websocketSlice';
import MessageInput from './MessageInput';
import UserList from './UserList';
import { AppDispatch } from '../store';
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

const ChatRoom: React.FC = () => {
  const { roomName } = useParams<{ roomName: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { messages, users } = useSelector((state: RootState) => state.websocket);
  const [localMessages, setLocalMessages] = useState<string[]>([]);

  useEffect(() => {
    if (roomName) {
      console.log('Connecting to room:', roomName);
      dispatch(connect({
        roomName,
        onMessage: (msg: string) => {
          console.log('Received message:', msg);
          dispatch(receiveMessage(msg));
        },
        onUpdateUsers: (userList: string[]) => dispatch(updateUsers(userList))
      }));
    }
    return () => {
      console.log('Disconnecting from room:', roomName);
      dispatch(disconnect());
    };
  }, [dispatch, roomName]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    dispatch(sendMessage(message));
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Chat Room: {roomName}
      </Typography>
      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Typography variant="h6">Messages</Typography>
        <List>
          {localMessages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText primary={msg} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <UserList users={users} />
      <MessageInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;




