import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect, sendMessage, disconnect, receiveMessage, updateUsers } from '../store/slicers/websocketSlice';
import { AppDispatch } from 'src/store';

const WebSocketComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleReceiveMessage = (message: string) => {
      dispatch(receiveMessage(message));
    };

    const handleUpdateUsers = (users: string[]) => {
      dispatch(updateUsers(users));
    };

    dispatch(connect({
      roomName: 'some_room_name',
      onMessage: handleReceiveMessage,
      onUpdateUsers: handleUpdateUsers,
    }));

    // שולח הודעת בדיקה לאחר התחברות
    const interval = setInterval(() => {
      dispatch(sendMessage('Hello, WebSocket!'));
    }, 5000);

    return () => {
      clearInterval(interval);
      dispatch(disconnect());
    };
  }, [dispatch]);

  return <div>WebSocket Component</div>;
};

export default WebSocketComponent;
