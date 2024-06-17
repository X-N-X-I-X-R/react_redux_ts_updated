import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { fetchUserProfile, updateUserProfile, UserProfile as UserProfileType } from '../store/slicers/userprofile_slice';
import { AppDispatch } from '../store';
import { Box, Button, Container, Grid, TextField, Typography, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

const Userprofile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userprofile);
  const [formState, setFormState] = useState<UserProfileType | null>(null);
  const userId = parseInt(sessionStorage.getItem('user_id') || '0');
  const [countries, setCountries] = useState<{ code: string, name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserProfile(userId))
        .unwrap()
        .then((profile) => {
          setFormState(profile);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch user profile:', err);
          setError('Failed to fetch user profile');
          setLoading(false);
        });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    axios.get('/api/countries/')
      .then(response => setCountries(response.data))
      .catch(error => {
        console.error('Error fetching countries:', error);
        setError('Error fetching countries');
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formState) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    if (formState) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState) {
      dispatch(updateUserProfile({ ...formState, id: userId }))
        .unwrap()
        .then(() => {
          console.log('User profile updated successfully');
        })
        .catch((err) => {
          console.error('Failed to update user profile:', err);
          setError('Failed to update user profile');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!formState) {
    return <div>No user profile data available.</div>;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          User Profile
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="user_nickname"
                fullWidth
                label="Nickname"
                value={formState.user_nickname || ''}
                onChange={handleChange}
                inputProps={{ maxLength: 25 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="user_gender-label">Gender</InputLabel>
                <Select
                  labelId="user_gender-label"
                  name="user_gender"
                  value={formState.user_gender}
                  onChange={handleSelectChange}
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="user_country-label">Country</InputLabel>
                <Select
                  labelId="user_country-label"
                  name="user_country"
                  value={formState.user_country}
                  onChange={handleSelectChange}
                >
                  {countries.length > 0 ? countries.map(country => (
                    <MenuItem key={country.code} value={country.code}>
                      {country.name}
                    </MenuItem>
                  )) : <MenuItem value=""><em>No countries available</em></MenuItem>}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="user_phone"
                fullWidth
                label="Phone"
                value={formState.user_phone || ''}
                onChange={handleChange}
                inputProps={{ maxLength: 25 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="user_birth_date"
                fullWidth
                label="Birth Date"
                type="date"
                value={formState.user_birth_date || ''}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="user_bio"
                fullWidth
                label="Bio"
                multiline
                rows={4}
                value={formState.user_bio || ''}
                onChange={handleChange}
                inputProps={{ maxLength: 500 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="user_website"
                fullWidth
                label="Website"
                value={formState.user_website || ''}
                onChange={handleChange}
                inputProps={{ maxLength: 200 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                Upload Profile Image
                <input
                  type="file"
                  hidden
                  name="user_profile_image"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFormState({
                        ...formState,
                        user_profile_image: URL.createObjectURL(e.target.files[0])
                      });
                    }
                  }}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Userprofile;
