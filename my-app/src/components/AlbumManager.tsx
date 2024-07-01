import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Tooltip, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { createAlbum, fetchAlbums, deleteAlbum, updateAlbum } from '../store/slicers/albumSlice';
import { AppDispatch, RootState } from '../store';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const AlbumManager: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const albums = useSelector((state: RootState) => state.albums.albums);
  const [newAlbum, setNewAlbum] = useState<string>('');
  const [editAlbumId, setEditAlbumId] = useState<number | null>(null);
  const [editAlbumTitle, setEditAlbumTitle] = useState<string>('');

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleCreateAlbum = () => {
    if (newAlbum.trim()) {
      dispatch(createAlbum({ title: newAlbum }))
        .unwrap()
        .then(() => {
          setNewAlbum('');
        })
        .catch((error: any) => {
          console.error('Failed to create album:', error.detail || error);
        });
    }
  };

  const handleDeleteAlbum = (albumId: number) => {
    dispatch(deleteAlbum(albumId))
      .unwrap()
      .then(() => {
        console.log('Album deleted successfully');
      })
      .catch((error) => {
        console.error('Failed to delete album:', error);
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
        })
        .catch((error: any) => {
          console.error('Failed to update album:', error.detail || error);
        });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '',
        boxShadow: '0px 4px 20px rgba(245, 133, 73, 0.3)',
        padding: 4,
        borderRadius: 2,
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#F58549',
          fontWeight: 'bold',
          textShadow: '2px 2px 1px #000',
        }}
      >
        Create New Album
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
        <Tooltip title="Enter new album title">
          <TextField
            label="New Album"
            value={newAlbum}
            onChange={(e) => setNewAlbum(e.target.value)}
            margin="normal"
            InputLabelProps={{ style: { color: '#F58549' } }}
            InputProps={{
              style: { color: 'white' },
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
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#F58549',
                },
                '&:hover fieldset': {
                  borderColor: '#F58549',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#F58549',
                },
              },
              '& label': {
                color: '#F58549',
              },
              '& input': {
                color: 'white',
              },
            }}
          />
        </Tooltip>
        <Tooltip title="Create new album">
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateAlbum}
            sx={{
              backgroundColor: '#F58549',
              '&:hover': { backgroundColor: '#F58549' },
              color: 'white',
              height: '56px',
              marginLeft: 2,
            }}
            startIcon={<PhotoAlbumIcon />}
          >
            CREATE ALBUM
          </Button>
        </Tooltip>
      </Box>

      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: '#F58549',
          fontWeight: 'bold',
          marginTop: 4,
          textShadow: '2px 2px 1px #000',
        }}
      >
        Existing Albums
      </Typography>
      {albums.length === 0 ? (
        <Typography
          sx={{
            color: '#F58549',
            fontWeight: 'bold',
            textShadow: '1px 1px 1px #000',
            marginTop: 2,
          }}
        >
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
                <PhotoAlbumIcon sx={{ color: '#F58549' }} />
              </ListItemIcon>
              {editAlbumId === album.id ? (
                <TextField
                  value={editAlbumTitle}
                  onChange={(e) => setEditAlbumTitle(e.target.value)}
                  sx={{ color: 'white', flexGrow: 1, input: { color: 'white' } }}
                  InputLabelProps={{ style: { color: '#F58549' } }}
                  InputProps={{
                    style: { color: 'white' },
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
                    color: 'white',
                    textShadow: '1px 1px 1px #000',
                  }}
                />
              )}
              {editAlbumId === album.id ? (
                <Tooltip title="Save album title">
                  <IconButton
                    onClick={handleSaveEditAlbum}
                    className="save-icon"
                    sx={{
                      color: '#F58549',
                      '&:hover': { color: '#00ff00' },
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
                      color: '#F58549',
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
                    color: '#F58549',
                    '&:hover': { color: '#ff0000' },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AlbumManager;


