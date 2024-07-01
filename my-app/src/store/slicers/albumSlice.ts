import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AlbumInterface {
  id: number;
  title: string;
  created_at: string;
  is_private_or_global: boolean; // Ensure this is included if needed
}

interface AlbumsState {
  albums: AlbumInterface[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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

export const fetchAlbums = createAsyncThunk<AlbumInterface[], void, { rejectValue: ErrorResponse }>(
  'albums/fetchAlbums',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://127.0.0.1:8000/api/albums/', {
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

export const createAlbum = createAsyncThunk<AlbumInterface, { title: string }, { rejectValue: ErrorResponse }>(
  'albums/createAlbum',
  async ({ title }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post('http://127.0.0.1:8000/api/albums/', { title }, {
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

export const deleteAlbum = createAsyncThunk<void, number, { rejectValue: ErrorResponse }>(
  'albums/deleteAlbum',
  async (albumId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`http://127.0.0.1:8000/api/albums/${albumId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateAlbum = createAsyncThunk<AlbumInterface, { id: number; title: string }, { rejectValue: ErrorResponse }>(
  'albums/updateAlbum',
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(`http://127.0.0.1:8000/api/albums/${id}/`, { title }, {
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

const initialState: AlbumsState = {
  albums: [],
  status: 'idle',
  error: null,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to fetch albums';
      })
      .addCase(createAlbum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums.push(action.payload);
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to create album';
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.albums = state.albums.filter((album) => album.id !== action.meta.arg);
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to delete album';
      })
      .addCase(updateAlbum.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.albums.findIndex((album) => album.id === action.payload.id);
        if (index !== -1) {
          state.albums[index] = action.payload;
        }
      })
      .addCase(updateAlbum.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to update album';
      });
  },
});

export const { reducer: albumsReducer } = albumsSlice;

export default albumsSlice.reducer;
