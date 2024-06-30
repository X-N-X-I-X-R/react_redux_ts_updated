import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, TextField, Button } from '@mui/material';
import { createAlbum } from '../store/slicers/albumSlice';
import { AppDispatch } from '../store';

const AlbumManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [newAlbum, setNewAlbum] = useState<string>('');

  const handleCreateAlbum = () => {
    if (newAlbum.trim()) {
      dispatch(createAlbum({ title: newAlbum }))  // Changed from 'name' to 'title'
        .unwrap()
        .then(() => {
          setNewAlbum('');
        })
        .catch((error: any) => {
          console.error('Failed to create album:', error.detail || error);
        });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Album
      </Typography>
      <TextField
        label="New Album"
        value={newAlbum}
        onChange={(e) => setNewAlbum(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateAlbum}>
        Create Album
      </Button>
    </Box>
  );
};

export default AlbumManager;
