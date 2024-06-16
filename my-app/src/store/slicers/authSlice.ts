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
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
    isAuthenticated: false, 
};

const MYSERVER = 'http://localhost:8000/';

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

export const { logout } = authSlice.actions;
export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
