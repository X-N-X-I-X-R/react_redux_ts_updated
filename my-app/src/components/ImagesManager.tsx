import React, { useState, useEffect } from 'react';
import { RootState } from '../store/rootReducer';
import { Box, Button, Typography, TextField, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AddAPhoto, Delete, Person } from '@mui/icons-material';
import styled from '@emotion/styled';
import { fetchImages, deleteImage, uploadImage, setProfilePicture, ImagesInterface } from '../store/slicers/imagesSlice';
import { useSelector, useDispatch } from '../store/hooks';
import { fetchAlbums, createAlbum } from '../store/slicers/albumSlice';

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
  const albums = useSelector((state: RootState) => state.albums.albums);
  const status = useSelector((state: RootState) => state.images.status);
  const error = useSelector((state: RootState) => state.images.error);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [album, setAlbum] = useState<number | ''>('');
  const [newAlbum, setNewAlbum] = useState<string>('');

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      dispatch(uploadImage({ image: selectedImage, subject, album: album === '' ? null : album }));
      setSelectedImage(null);
      setSubject('');
      setAlbum('');
    }
  };

  const handleDelete = (imageId: number) => {
    dispatch(deleteImage(imageId));
  };

  const handleSetProfilePicture = (imageId: number) => {
    dispatch(setProfilePicture(imageId));
  };

  const handleCreateAlbum = () => {
    if (newAlbum.trim()) {
      dispatch(createAlbum({ name: newAlbum }))
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
        Manage Your Images
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField
          label="Image Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="album-select-label">Select Album</InputLabel>
          <Select
            labelId="album-select-label"
            value={album}
            onChange={(e) => setAlbum(e.target.value as number | '')}
          >
            {albums.map((album) => (
              <MenuItem key={album.id} value={album.id}>
                {album.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="New Album"
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleCreateAlbum}>
          Create Album
        </Button>
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
            <Box display="flex">
              <IconButton onClick={() => handleDelete(image.id)} color="secondary">
                <Delete />
              </IconButton>
              <IconButton onClick={() => handleSetProfilePicture(image.id)} color="primary">
                <Person />
              </IconButton>
            </Box>
          </ImageContainer>
        ))}
      </Box>
    </Box>
  );
};

export default ImagesManager;
