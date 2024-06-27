// src/store/slicers/meetingSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../rootReducer';

export const createMeeting = createAsyncThunk('meeting/createMeeting', async (_, { getState }) => {
  const state = getState() as RootState;
  const userInfo = {
    email: state.auth.email,
    displayName: state.auth.displayName,
  };
  const response = await axios.post('http://localhost:8000/api/meetings/create_meeting/', userInfo);
  return response.data;
});

interface MeetingState {
  roomName: string;
}

const initialState: MeetingState = {
  roomName: '',
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState,
  reducers: {
    setRoomName(state, action: PayloadAction<string>) {
      state.roomName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createMeeting.fulfilled, (state, action) => {
      state.roomName = action.payload.meeting_data.roomName;
    });
  },
});

export const { setRoomName } = meetingSlice.actions;
export default meetingSlice.reducer;
