// src/components/Chat.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { addMessage } from '../store/slicers/chatSlice';

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const messages = useSelector((state: RootState) => state.chat.messages);
  const usernickname = sessionStorage.getItem('user_nickname') || 'user';
  const dispatch = useDispatch();

  useEffect(() => {
    const roomName = "general";
    const chatSocket = new WebSocket(
      'ws://' + window.location.hostname + ':8001/ws/chat/' + roomName + '/'
    );

    chatSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      dispatch(addMessage(data.message));
    };

    chatSocket.onclose = (_e) => {
      console.error('Chat socket closed unexpectedly');
    };

    chatSocket.onopen = () => {
      console.log('Chat socket opened');
    };

    return () => chatSocket.close();
  }, [dispatch]);

  const sendMessage = () => {
    const roomName = "general";
    const chatSocket = new WebSocket(
      'ws://' + window.location.hostname + ':8001/ws/chat/' + roomName + '/'
    );

    chatSocket.onopen = () => {
      chatSocket.send(JSON.stringify({
        'message': message
      }));
      setMessage('');
    };
  };

  return (
    <div>
      <h1>hey {usernickname}</h1>
      <div id="chat-log">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        id="chat-message-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button id="chat-message-submit" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default Chat;
