import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Tooltip, List, ListItem, ListItemIcon, ListItemText, IconButton, Snackbar, Alert } from '@mui/material';
import { createAlbum, fetchAlbums, deleteAlbum, updateAlbum } from '../store/slicers/albumSlice';
import { AppDispatch, RootState } from '../store';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { fetchImages } from '../store/slicers/imagesSlice';

const AlbumManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const [newAlbum, setNewAlbum] = useState<string>('');
  const [editAlbumId, setEditAlbumId] = useState<number | null>(null);
  const [editAlbumTitle, setEditAlbumTitle] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleCreateAlbum = () => {
    if (newAlbum.trim()) {
      dispatch(createAlbum({ title: newAlbum }))
        .unwrap()
        .then(() => {
          setNewAlbum('');
          setSnackbarMessage('Album created successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error: any) => {
          console.error('Failed to create album:', error.detail || error);
          setSnackbarMessage(`Failed to create album: ${error.detail || 'Unknown error'}`);
          setSnackbarSeverity('error');
          setSnackbarOpen(true);
        });
    }
  };

  const handleDeleteAlbum = (albumId: number) => {
    dispatch(deleteAlbum(albumId))
      .unwrap()
      .then(() => {
        console.log('Album deleted successfully');
        setSnackbarMessage('Album deleted successfully');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        dispatch(fetchImages());
      })
      .catch((error) => {
        console.error('Failed to delete album:', error);
        setSnackbarMessage('Failed to delete album');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      });
  };

  const handleEditAlbum = (albumId: number, currentTitle: string) => {
    setEditAlbumId(albumId);
    setEditAlbumTitle(currentTitle);
  };

  const handleSaveEditAlbum = () => {
    if (editAlbumTitle.trim() && editAlbumId !== null) {
      dispatch(updateAlbum({ id: editAlbumId, title: editAlbumTitle }))
        .unwrap()
        .then(() => {
          setEditAlbumId(null);
          setEditAlbumTitle('');
          setSnackbarMessage('Album updated successfully');
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        })
        .catch((error: any) => {
          console.error('Failed to update album:', error.detail || error);
          setSnackbarMessage(`Failed to update album: ${error.detail || 'Unknown error'}`);
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
        boxShadow: '0px 0px 50px rgba(245, 133, 73, 0.3)',
        padding: 4,
        borderRadius: 2,
        color: 'white',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: '#000',
          fontWeight: 'bold',
          textShadow: '1px 1px 1px #',
          fontFamily:''
        }}
      >
        Create New Album
      </Typography>
      <Tooltip title="Enter new album title">
        <TextField
          label="New Album"
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
          margin="normal"
          InputLabelProps={{ style: { color: '#000' } }}
          InputProps={{
            style: { color: 'black' },
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
                  borderColor: '#F58549',
                },
              },
            },
          }}
          sx={{
            marginBottom: 2,
            width: '300px',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#000',
              },
              '&:hover fieldset': {
                borderColor: '#F58549',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#F58549',
              },
            },
            '& label': {
                        color: '#000',
          fontWeight: 'bold',
            },
            '& input': {
              color: 'black',
            },
          }}
        />
      </Tooltip>


      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: '#000',
          fontWeight: '',
          borderBottom: '2px solid #000',
          marginTop: 4,
          textShadow: '1px 1px 1px #F000',
        }}
      >
        Existing Albums
      </Typography>
      {albums.length === 0 ? (
        <Typography sx={{ color: '#F58549', textShadow: '1px 1px 1px #000', marginBottom: 2 }}>
          Create albums, share with friends, and join our community with enthusiasm!
        </Typography>
      ) : (
        <List>
          {albums.map((album) => (
            <ListItem
              key={album.id}
              sx={{
                '&:hover .edit-icon, &:hover .delete-icon': {
                  display: 'block',
                },      
              }}
            >
              <ListItemIcon>
                <PhotoAlbumIcon sx={{ color: 'darkcyan',marginTop :'-25' }} />
              </ListItemIcon>
              {editAlbumId === album.id ? (
                <TextField
                  value={editAlbumTitle}
                  onChange={(e) => setEditAlbumTitle(e.target.value)}
                  sx={{ color: 'white', flexGrow: 1, input: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#000' } }}
                  InputProps={{
                    style: { color: 'black' },
                    sx: {
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#F58549',
                          borderWidth: 2,
                        },
                        '&:hover fieldset': {
                          borderColor: '#F58549',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#F58549',

                        },
                      },
                    },
                  }}
                />
              ) : (
                <ListItemText
                  primary={album.title}
                  sx={{
                    color: 'cadetblue',
                    textShadow: '1px 1px 1px #000',
                                              marginTop: '-25',

                  }}
                />
              )}
              {editAlbumId === album.id ? (
                <Tooltip title="Save album title">
                  <IconButton
                    onClick={handleSaveEditAlbum}
                    className="save-icon"
                    sx={{
                      color: 'green',
                      '&:hover': { color: 'lightgreen' },
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Edit album title">
                  <IconButton
                    onClick={() => handleEditAlbum(album.id, album.title)}
                    className="edit-icon"
                    sx={{
                      display: 'none',
                      color: '#blue',
                      '&:hover': { color: '#00ff00' },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Delete album">
                <IconButton
                  onClick={() => handleDeleteAlbum(album.id)}
                  className="delete-icon"
                  sx={{
                    display: 'none',
                    color: '#red',
                    '&:hover': { color: '#ff0000' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              
            </ListItem>
          ))}
                <Tooltip title="Create new album">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateAlbum}
          sx={{
            backgroundColor: '#000',
            '&:hover': { backgroundColor: '#F58549' },
            color: 'white',
            marginTop:'40PX'
            
          }}
          startIcon={<PhotoAlbumIcon />}
        >
          Create Album
        </Button>
      </Tooltip>
        </List>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AlbumManager;
