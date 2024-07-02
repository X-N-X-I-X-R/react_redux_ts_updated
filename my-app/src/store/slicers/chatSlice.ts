import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ChatRoom {
  id: string;
  name: string;
}

interface ChatState {
  rooms: ChatRoom[];
  loading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  rooms: [],
  loading: false,
  error: null,
};

const getAuthToken = () => {
  const token = sessionStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token not found');
  }
  return token;
};

export const fetchChatRooms = createAsyncThunk('chat/fetchChatRooms', async () => {
  const token = getAuthToken();
  const response = await axios.get('http://127.0.0.1:8000/api/chatrooms/', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Fetched chat rooms:', response.data);
  return response.data;
});

export const createChatRoom = createAsyncThunk('chat/createChatRoom', async (roomName: string) => {
  const token = getAuthToken();
  const response = await axios.post('http://127.0.0.1:8000/api/chatrooms/', { name: roomName }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log('Created chat room:', response.data);
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
        console.log('Chat rooms loaded into state:', state.rooms);
      })
      .addCase(fetchChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch chat rooms';
      })
      .addCase(createChatRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
        console.log('Chat room added to state:', state.rooms);
      })
      .addCase(createChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create chat room';
      });
  },
});

export default chatSlice.reducer;
