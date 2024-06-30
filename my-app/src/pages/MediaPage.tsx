import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import ImagesManager from '../components/ImagesManager';
import AlbumManager from '../components/AlbumManager';
import { fetchImages } from '../store/slicers/imagesSlice';
import { fetchAlbums } from '../store/slicers/albumSlice';

const MediaPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Media Management
      </Typography>
      <Box display="flex" justifyContent="space-around" marginTop="20px">
        <Box>
          <Typography variant="h4" gutterBottom>
            Image Manager
          </Typography>
          <ImagesManager />
        </Box>
        <Box>
          <Typography variant="h4" gutterBottom>
            Album Manager
          </Typography>
          <AlbumManager />
        </Box>
      </Box>
    </Box>
  );
};

export default MediaPage;
