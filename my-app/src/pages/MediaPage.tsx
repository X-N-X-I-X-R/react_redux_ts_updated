import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton, Modal, Tooltip, Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import ImagesManager from '../components/ImagesManager';
import AlbumManager from '../components/AlbumManager';
import { fetchImages, deleteImage, setProfilePicture } from '../store/slicers/imagesSlice';
import { fetchAlbums } from '../store/slicers/albumSlice';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MediaPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images.images);
  const albums = useSelector((state: RootState) => state.albums.albums);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(fetchAlbums());
  }, [dispatch]);

  const getAlbumTitle = (albumId: number) => {
    const album = albums.find((album) => album.id === albumId);
    return album ? album.title : 'Unknown Album';
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDelete = (imageId: number) => {
    dispatch(deleteImage(imageId))
      .unwrap()
      .then(() => {
        setSnackbarMessage('Image deleted successfully');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Failed to delete image:', error);
        setSnackbarMessage('Failed to delete image');
        setSnackbarOpen(true);
      });
  };

  const handleSetProfilePicture = (imageId: number) => {
      dispatch(setProfilePicture(imageId))
      .unwrap()
      .then(() => {
        setSnackbarMessage('Profile picture set successfully');
        setSnackbarOpen(true);
      })
      .catch((error) => {
        console.error('Failed to set profile picture:', error);
        setSnackbarMessage('Failed to set profile picture');
        setSnackbarOpen(true);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage(null);
  };

  return (
    <Box padding="20px" sx={{ fontFamily:'fantasy', backgroundColor: '',        boxShadow: '0px 0px 50px rgba(4, 4, 223, 0.4)',
 }}
    >

      <Box display="flex" justifyContent="space-around" marginTop="20px">
        <Card sx={{ minWidth: 300, borderRadius: 2, boxShadow: '0px 0px 50px rgba(74, 144, 226, 0.3)'

 }}>
          <CardContent>
   
            <ImagesManager />
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 300, boxShadow: '0px 0px 50px rgba(74, 144, 226, 0.3)', borderRadius: 2 ,}}>
          <CardContent>
            <AlbumManager />
          </CardContent>
        </Card>
      </Box>
      <Box marginTop="20px">
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
      
            <Box display="flex" alignItems="center">
              <IconButton onClick={scrollLeft} size="large">
                <ArrowBackIosIcon />
              </IconButton>
              <Box
                ref={scrollContainerRef}
                display="flex"
                overflow="auto"
                whiteSpace="nowrap"
                flexGrow={1}
                sx={{
                  scrollBehavior: 'smooth',
                  padding: 1,
                  '&::-webkit-scrollbar': { height: 8 },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#90caf9', borderRadius: 4 },
                }}
              >
                {images.map((image) => (
                  <Box key={image.id} flex="0 0 auto" margin="5px" position="relative">
                    <Card sx={{ width: 207, boxShadow: 10, borderRadius: 10 }}>
                      <Box position="relative">
                        <img
                          src={image.user_image_container ?? undefined}
                          alt={image.image_subject ?? ''}
                          style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px 10px 0 0' }}
                          onClick={() => handleImageClick(image.user_image_container ?? '')}
                        />
                        <Box
                          position="absolute"
                          top="0"
                          left="0"
                          width="100%"
                          height="100%"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            opacity: 0,
                            '&:hover': {
                              opacity: 1,
                            },
                          }}
                        >
                          <Tooltip title="Delete">
                            <IconButton onClick={() => handleDelete(image.id)} sx={{ color: 'white' }}>
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Set as Profile Image">
                            <IconButton onClick={() => handleSetProfilePicture(image.id)} sx={{ color: 'white' }}>
                              <PersonIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      <CardContent sx={{ padding: '8px' }}>
                        <Typography variant="subtitle2" sx={{ color: '#0288d1', fontWeight: 'bold', fontSize: '0.7rem' }}>
                          {image.image_subject}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                          Album: {getAlbumTitle(image.album)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.6rem' }}>
                          Created at: {new Date(image.created_at).toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
              <IconButton onClick={scrollRight} size="large">
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Modal open={!!selectedImage} onClose={handleCloseModal} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 4,
          }}
        >
          <Box position="relative">
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
            {selectedImage && (
              <img src={selectedImage} alt="Selected" style={{ maxHeight: '90vh', maxWidth: '90vw', borderRadius: '10px' }} />
            )}
          </Box>
        </Box>
      </Modal>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MediaPage;
