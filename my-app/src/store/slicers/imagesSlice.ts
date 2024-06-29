// imagesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ImagesInterface {
  id: number;
  user_profile_image: string;
  user_image_container: string;
  image_subject: string;
}

const getAuthToken = () => {
  const token = sessionStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token not found');
  }
  return token;
};

export const fetchImages = createAsyncThunk('images/fetchImages', async (_, { rejectWithValue }) => {
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
});

export const uploadImage = createAsyncThunk('images/uploadImage', async ({ image, subject }: { image: File, subject: string }, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('user_profile_image', image);
  formData.append('image_subject', subject);
  try {
    const token = getAuthToken();
    const response = await axios.post('http://127.0.0.1:8000/api/images/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteImage = createAsyncThunk('images/deleteImage', async (imageId: number, { rejectWithValue }) => {
  try {
    const token = getAuthToken();
    await axios.delete(`http://127.0.0.1:8000/api/images/${imageId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return imageId;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [] as ImagesInterface[],
    status: 'idle',
    error: null as string | null,
  },
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
        state.error = action.error.message || 'Failed to fetch images';
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
        state.error = action.error.message || 'Failed to upload image';
      })
      .addCase(deleteImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = state.images.filter((image) => image.id !== action.payload);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete image';
      });
  },
});

export default imagesSlice.reducer;
