import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { MYSERVER } from './authSlice';

export interface UserProfile {
  first_name: unknown;
  last_name: unknown;
  email: unknown;
  phone: unknown;
  address: unknown;
  country: string | undefined;
  id: number;
  user_nickname: string;
  user_gender: 'M' | 'F' | 'O' | '';
  user_country: string;
  user_phone: string | null;
  user_birth_date: string; // Date is represented as string in JSON
  user_register_date: string; // Date is represented as string in JSON
  last_login: string; // Date is represented as string in JSON
  user_bio: string | null;
  user_website: string | null;
  user_image_container: string;
  user_profile_image: string;
  active: boolean;
}

const initialState: UserProfile = {
  id: 0,
  user_nickname: '',
  user_gender: 'O',
  user_country: '',
  user_phone: '',
  user_birth_date: '',
  user_register_date: '',
  last_login: '',
  user_bio: '',
  user_website: '',
  user_image_container: '',
  user_profile_image: '',
  active: false,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  phone: undefined,
  address: undefined,
  country: undefined
};

export const fetchUserProfile = createAsyncThunk<UserProfile, number, { rejectValue: string }>(
  'userprofile/fetchUserProfile',
  async (user_id, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await axios.get(`${MYSERVER}api/profiles/${user_id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch user profile');
    }
  }
);

export const updateUserProfile = createAsyncThunk<UserProfile, UserProfile, { rejectValue: string }>(
  'userprofile/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem('access_token');
      const response = await axios.put(`${MYSERVER}api/profiles/${profileData.id}/`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update user profile');
    }
  }
);

const userprofileSlice = createSlice({
  name: 'userprofile',
  initialState,
  reducers: {
    setInitialState: (_state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.active = false; // Example: setting loading state
      })
      .addCase(fetchUserProfile.fulfilled, (_state, action: PayloadAction<UserProfile>) => {
        return action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.error(action.payload); // בדוק את השגיאה
        state.active = false; // Example: handling error state
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.active = false; // Example: setting loading state
      })
      .addCase(updateUserProfile.fulfilled, (_state, action: PayloadAction<UserProfile>) => {
        return action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        console.error(action.payload); // בדוק את השגיאה
        state.active = false; // Example: handling error state
      });
  },
});

export const { setInitialState } = userprofileSlice.actions;

export default userprofileSlice.reducer;
