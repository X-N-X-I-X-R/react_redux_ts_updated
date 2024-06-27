import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserProfileInterface {
  last_updated: any;
  id: number;
  user_nickname: string;
  user_gender: string;
  user_country: string;
  user_phone: string;
  user_birth_date: string;
  user_bio: string;
  user_website: string;
  user_image_container: string;
  user_profile_image: string;
}

export const setInitialState: {
  profile: UserProfileInterface | undefined;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  profile: undefined,
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    const user_Profile_id = sessionStorage.getItem('user_Profile_id')
    if (!user_Profile_id) {
      console.error('User profile ID is null or not found in session storage.');
      return rejectWithValue('User profile ID is null or not found in session storage.');
    }
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/profiles/${user_Profile_id}/`);
      console.log(response.data);
      return response.data;
      
    } catch (error: any) {
      console.error('Error fetching user profile:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (profile: UserProfileInterface, { rejectWithValue }) => {
    const user_Profile_id = sessionStorage.getItem('user_Profile_id');
    if (!user_Profile_id) {
      console.error('User profile ID is null or not found in session storage.');
      return rejectWithValue('User profile ID is null or not found in session storage.');
    }
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/profiles/${user_Profile_id}/`, profile);
      return response.data;
    } catch (error: any) {
      console.error('Error updating user profile:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: {
  profile: UserProfileInterface | {};
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  profile: {},
  status: 'idle',
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to update user profile';
      });
  },
});

export default userProfileSlice.reducer;
