import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface WebSocketState {
  socket: WebSocket | null;
  messages: string[];
  users: string[];
}

interface ConnectPayload {
  roomName: string;
  onMessage: (message: string) => void;
  onUpdateUsers: (users: string[]) => void;
}

const initialState: WebSocketState = {
  socket: null,
  messages: [],
  users: [],
};

const getAuthToken = () => {
  const token = sessionStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token not found');
  }
  return token;
};

export const connect = createAsyncThunk(
  'websocket/connect',
  async ({ roomName, onMessage, onUpdateUsers }: ConnectPayload, { dispatch }) => {
    const token = getAuthToken();
    const socket = new WebSocket(`ws://127.0.0.1:8099/ws/private_chat/${roomName}/`);
    
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        onMessage(data.message);
      }
      if (data.users) {
        onUpdateUsers(data.users);
      }
    };

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return socket;
  }
);

const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    receiveMessage: (state, action: PayloadAction<string>) => {
      if (!state.messages.includes(action.payload)) {
        state.messages.push(action.payload);
      }
    },
    updateUsers: (state, action: PayloadAction<string[]>) => {
      state.users = action.payload;
    },
    sendMessage: (state, action: PayloadAction<string>) => {
      if (state.socket && state.socket.readyState === WebSocket.OPEN) {
        state.socket.send(JSON.stringify({ message: action.payload }));
      }
    },
    disconnect: (state) => {
      if (state.socket) {
        state.socket.close();
        state.socket = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connect.fulfilled, (state, action) => {
      state.socket = action.payload;
    });
  },
});

export const { receiveMessage, updateUsers, sendMessage, disconnect } = websocketSlice.actions;
export default websocketSlice.reducer;
