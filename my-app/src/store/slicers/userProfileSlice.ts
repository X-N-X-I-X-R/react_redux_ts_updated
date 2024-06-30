import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserProfileInterface {
  last_updated: string | null | undefined;
  id: number;
  user_nickname: string;
  user_bio: string;
  user_birth_date: string;
  user_gender: string;
  user_country: string;
  user_website: string;
}

interface ErrorResponse {
  detail: string;
}

const getAuthToken = () => {
  const token = sessionStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token not found');
  }
  return token;
};

export const fetchUserProfile = createAsyncThunk<UserProfileInterface, number, { rejectValue: ErrorResponse }>(
  'userProfile/fetchUserProfile',
  async (profileId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${profileId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return rejectWithValue({ detail: 'Profile not found' });
      }
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateUserProfile = createAsyncThunk<UserProfileInterface, UserProfileInterface, { rejectValue: ErrorResponse }>(
  'userProfile/updateUserProfile',
  async (profile, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`http://127.0.0.1:8000/api/profiles/${profile.id}/`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    profile: null as UserProfileInterface | null,
    status: 'idle',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.detail : 'Failed to fetch profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.detail : 'Failed to update profile';
      });
  },
});

export default userProfileSlice.reducer;
