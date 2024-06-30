// src/store/slicers/imagesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ImageInterface {
  id: number;
  user: number;
  album: number;
  user_image_container: string;
  created_at: string;
  image_subject: string | null;
  is_profile_picture: boolean;
  is_private_or_global: boolean;
  title : string; 
}

interface ImagesState {
  images: ImageInterface[];
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

export const fetchImages = createAsyncThunk<ImageInterface[], void, { rejectValue: ErrorResponse }>(
  'images/fetchImages',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://127.0.0.1:8000/api/images/', {
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

export const uploadImage = createAsyncThunk<ImageInterface, FormData, { rejectValue: ErrorResponse }>(
  'images/uploadImage',
  async (formData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      const response = await axios.post('http://127.0.0.1:8000/api/images/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteImage = createAsyncThunk<void, number, { rejectValue: ErrorResponse }>(
  'images/deleteImage',
  async (imageId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.delete(`http://127.0.0.1:8000/api/images/${imageId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const setProfilePicture = createAsyncThunk<void, number, { rejectValue: ErrorResponse }>(
  'images/setProfilePicture',
  async (imageId, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      await axios.post(`http://127.0.0.1:8000/api/images/${imageId}/set_profile_picture/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: ImagesState = {
  images: [],
  status: 'idle',
  error: null,
};

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to fetch images';
      })
      .addCase(uploadImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images.push(action.payload);
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to upload image';
      })
      .addCase(deleteImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = state.images.filter(image => image.id !== action.meta.arg);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to delete image';
      })
      .addCase(setProfilePicture.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setProfilePicture.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedImageId = action.meta.arg;
        state.images.forEach(image => {
          if (image.id === updatedImageId) {
            image.is_profile_picture = true;
          } else {
            image.is_profile_picture = false;
          }
        });
      })
      .addCase(setProfilePicture.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.detail || 'Failed to set profile picture';
      });
  },
});

export const { reducer: imagesReducer } = imagesSlice;

export default imagesSlice.reducer;
