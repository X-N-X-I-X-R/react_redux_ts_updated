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
  user: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  email: string | null;
  displayName: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  email: null,
  displayName: null,
};

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
      state.email = null;
      state.displayName = null;
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('user_id');
      sessionStorage.removeItem('user_Profile_id');
      sessionStorage.removeItem('user_nickname');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('displayName');
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setInitialState: (state) => {
      const token = sessionStorage.getItem('access_token');
      const user = sessionStorage.getItem('user_nickname');
      const user_id = sessionStorage.getItem('user_id');
      const email = sessionStorage.getItem('email');
      const displayName = sessionStorage.getItem('displayName');

      if (token) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
        state.user = user_id;
        state.email = email;
        state.displayName = displayName;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ access: string; refresh: string; user: string; email: string; displayName: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.email = action.payload.email;
        state.displayName = action.payload.displayName;
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
