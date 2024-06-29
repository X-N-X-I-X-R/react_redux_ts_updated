// src/components/ImagesManager.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { Box, Button, Typography, TextField, IconButton } from '@mui/material';
import { AddAPhoto, Delete } from '@mui/icons-material';
import styled from '@emotion/styled';
import { fetchImages, deleteImage, uploadImage, ImagesInterface } from '../store/slicers/imagesSlice';

const ImageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
  border: '1px solid #ccc',
  padding: '10px',
  borderRadius: '10px',
  maxWidth: '200px',
  '& img': {
    maxWidth: '100%',
    borderRadius: '10px',
  },
});

const ImagesManager: React.FC = () => {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images.images);
  const status = useSelector((state: RootState) => state.images.status);
  const error = useSelector((state: RootState) => state.images.error);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>('');

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      dispatch(uploadImage({ image: selectedImage, subject }));
      setSelectedImage(null);
      setSubject('');
    }
  };

  const handleDelete = (imageId: number) => {
    dispatch(deleteImage(imageId));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Your Images
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Image Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" component="label" startIcon={<AddAPhoto />}>
          Choose Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedImage}>
          Upload
        </Button>
      </Box>
      {status === 'loading' && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{String(error)}</Typography>}
      <Box display="flex" flexWrap="wrap" justifyContent="center" marginTop="20px">
        {images.map((image: ImagesInterface) => (
          <ImageContainer key={image.id}>
            <img src={image.user_profile_image} alt={image.image_subject} />
            <Typography>{image.image_subject}</Typography>
            <IconButton onClick={() => handleDelete(image.id)} color="secondary">
              <Delete />
            </IconButton>
          </ImageContainer>
        ))}
      </Box>
    </Box>
  );
};

export default ImagesManager;
