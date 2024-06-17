import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Credentials {
  username: string;
  password: string;
}

interface RegisterData extends Credentials {
  email: string;
}

interface AuthState {
  [x: string]: any;
  user: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false, 
};

export interface UserProfile {
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

export const MYSERVER = 'http://localhost:8000/';

export const login = createAsyncThunk('auth/login', async (credentials: Credentials) => {
  const response = await axios.post(`${MYSERVER}login/`, credentials);

  return response.data;
});

export const register = createAsyncThunk('auth/register', async (registerData: RegisterData) => {
  const response = await axios.post(`${MYSERVER}api/register_user/`, registerData);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {   
      state.user = null;
      state.token = null;
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setInitialState: (state) => {
      const token = sessionStorage.getItem('access_token');
      const user = sessionStorage.getItem('user_nickname');
      const user_id = sessionStorage.getItem('user_id');
      const nickname = sessionStorage.getItem('user_nickname');
      if (token) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.user = nickname;
        state.user = user_id;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ access: string; refresh: string; user: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<{ user: string; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register';
      });
  } 
});

export const { logout, setAuthenticated, setInitialState } = authSlice.actions;

export default authSlice.reducer;