import React, { useState, useEffect } from 'react';
import { RootState } from '../store/rootReducer';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages, deleteImage, uploadImage, setProfilePicture, ImageInterface } from '../store/slicers/imagesSlice';
import { fetchAlbums, createAlbum } from '../store/slicers/albumSlice';
import { AppDispatch } from '../store';

const ImagesManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
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
    const formData = new FormData();
    formData.append('user_image_container', selectedImage);
    formData.append('image_subject', subject);
    if (album !== '') {
      formData.append('album', album.toString());
    } else {
      // Handle the case when no album is selected
      alert("Please select an album.");
      return;
    }

    dispatch(uploadImage(formData))
      .unwrap()
      .then(() => {
        setSelectedImage(null);
        setSubject('');
        setAlbum('');
      })
      .catch((error) => {
        console.error('Failed to upload image:', error);
      });
  }
};

  const handleDelete = (imageId: number) => {
    dispatch(deleteImage(imageId));
  };

  const handleSetProfilePicture = (imageId: number) => {
    dispatch(setProfilePicture(imageId));
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
                {album.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
     
       

        <Button variant="contained" component="label">
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
        {images.map((image: ImageInterface) => (
          <Box key={image.id} display="flex" flexDirection="column" alignItems="center" margin="10px">
            <img src={image.user_image_container ?? undefined} alt={image.image_subject ?? ''} style={{ maxWidth: '200px', borderRadius: '10px' }} />
            <Typography>{image.image_subject}</Typography>
            <Box display="flex">
              <Button onClick={() => handleDelete(image.id)} color="secondary">
                Delete
              </Button>
              <Button onClick={() => handleSetProfilePicture(image.id)} color="primary">
                Set as Profile Picture
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ImagesManager;
