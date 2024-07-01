import React, { useState, useEffect } from 'react';
import { RootState } from '../store/rootReducer';
import { Box, Typography, Button, TextField, Select, MenuItem, FormControl, InputLabel, Tooltip, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages, uploadImage, setProfilePicture } from '../store/slicers/imagesSlice';
import { fetchAlbums } from '../store/slicers/albumSlice';
import { AppDispatch } from '../store';
import ImageIcon from '@mui/icons-material/Image';
import UploadIcon from '@mui/icons-material/CloudUpload';

const ImagesManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
    const [isImageAdded, setIsImageAdded] = useState(false);

  const albums = useSelector((state: RootState) => state.albums.albums);
  const status = useSelector((state: RootState) => state.images.status);
  const error = useSelector((state: RootState) => state.images.error);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [album, setAlbum] = useState<number | ''>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleImageAddition = (event) => {
    // Assuming the event is the file input change event
    const files = event.target.files;
    if (files.length > 0) {
      setIsImageAdded(true);
      // Additional logic to handle the file upload can be added here
    } else {
      setIsImageAdded(false);
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
        alert('Please select an album.');
        return;
      }

      dispatch(uploadImage(formData))
        .unwrap()
        .then(() => {
          setSelectedImage(null);
          setSubject('');
          setAlbum('');
          setSnackbarMessage('Image uploaded successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error('Failed to upload image:', error);
          setSnackbarMessage(`Failed to upload image: ${error.image_subject ? error.image_subject[0] : 'Unknown error'}`);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <Box
      sx={{
        backgroundColor: '',
        boxShadow: '0px 0px 50px rgba(74, 144, 226, 0.3)',
        padding: 4,
        borderRadius: 2,
        color: 'white',
      }}
    >
      <Typography variant="h6" gutterBottom sx={{
              color: '#000',
          fontWeight: 'bold',
          textShadow: '1px 1px 1px #F000',
          fontFamily:''}}>
        Manage Your Images
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Tooltip title="Enter image subject">
          <TextField
            label="Image Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
            InputLabelProps={{ style: { color: '#000' } }}
            InputProps={{
              style: { color: 'black' }, // Set text color to black
              sx: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#000',
                    borderWidth: 2,
                  },
                  '&:hover fieldset': {
                    borderColor: '#000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000',
                  },
                },
              },
            }}
            sx={{ marginBottom: 2, width: '300px', textShadow: '1px 1px 1px #000' }}
          />
        </Tooltip>
        <FormControl fullWidth margin="normal" sx={{ marginBottom: 2, width: '300px' }}>
          <InputLabel id="album-select-label" sx={{ color: '#000', textShadow: '1px 1px 1px #000' }}>Select Album</InputLabel>
          <Tooltip title="Select an album">
            <Select
              labelId="album-select-label"
              value={album}
              onChange={(e) => setAlbum(e.target.value as number | '')}
              sx={{
                '& .MuiSelect-icon': { color: 'white' },
                '& .MuiInputBase-root': { color: 'white' },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#000' },
                textShadow: '1px 1px 1px #000',
              }}
            >
              {albums.map((album) => (
                <MenuItem key={album.id} value={album.id}>
                  {album.title}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
        </FormControl>
        <Tooltip title="Select an image to upload">
          <Button
            variant="contained"
            component="label"
            sx={{
              backgroundColor: '#000',
              '&:hover': { backgroundColor: '#000' },
              color: 'white',
              marginBottom: 2,
              textShadow: '1px 1px 1px #000',
            }}
            startIcon={<ImageIcon />}
          >
            Choose Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Tooltip>
        <Tooltip title="Upload selected image">
          <span>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!selectedImage}
              sx={{
                backgroundColor: '#000',
                '&:hover': { backgroundColor: '#000' },
                color: 'white',
                marginBottom: 2,
                textShadow: '1px 1px 1px #000',
              }}
              startIcon={<UploadIcon />}
            >
              Upload
            </Button>
          </span>
        </Tooltip>
      </Box>
      {status === 'loading' && (
        <Typography sx={{ color: 'white', textShadow: '1px 1px 1px #000' }}>
          Loading...
        </Typography>
      )}
      {error && (
        <Typography color="error" sx={{ textShadow: '1px 1px 1px #000' }}>
          {String(error)}
        </Typography>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ImagesManager;
