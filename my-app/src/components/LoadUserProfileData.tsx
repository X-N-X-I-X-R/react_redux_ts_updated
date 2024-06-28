import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../store/hooks';
import { fetchUserProfile, updateUserProfile, UserProfileInterface } from '../store/slicers/userProfileSlice';
import { RootState } from '../store/rootReducer';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, MenuItem, Typography, Select, InputLabel, FormControl, Snackbar, SelectChangeEvent } from '@mui/material';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import { countries } from 'countries-list';

type TCountryCode = keyof typeof countries;

const StyledTableCell = styled(TableCell)({
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#f0f0f0',
  color: '#333',
  borderBottom: '2px solid #ccc',
});

const LightPurpleStyledTableCell = styled(StyledTableCell)`
  background-color: #f3e5f5;
`;

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fafafa',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f4f4f4',
  },
});

const StyledButton = styled(Button)({
  borderRadius: '20px',
  padding: '10px 20px',
  margin: '5px',
  fontWeight: 'bold',
});

const formatDate = (date: string | null | undefined) => {
  if (!date) return 'no data yet';
  const datePart = moment.tz(date, 'Asia/Jerusalem').format('MMMM Do YYYY');
  const timePart = moment.tz(date, 'Asia/Jerusalem').format('h:mm:ss A');
  return `${datePart} at ${timePart}`;
};

const LoadUserProfileData: React.FC = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootState) => state.userProfile.profile) as UserProfileInterface | undefined;
  const status = useSelector((state: RootState) => state.userProfile.status);
  const error = useSelector((state: RootState) => state.userProfile.error);
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfileInterface | undefined>(userProfile);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  useEffect(() => {
    const user_Profile_id = sessionStorage.getItem('user_Profile_id');
    if (user_Profile_id && user_Profile_id !== 'null') {
      dispatch(fetchUserProfile());
    }
  }, [dispatch]);

  useEffect(() => {
    setEditedProfile(userProfile);
  }, [userProfile]);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => {
      if (!prev) return undefined;

      const updatedProfile: UserProfileInterface = {
        ...prev,
        [name]: value,
      };

      return updatedProfile;
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<TCountryCode>) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => {
      if (!prev) return undefined;

      const updatedProfile: UserProfileInterface = {
        ...prev,
        [name]: value as TCountryCode,
      };

      return updatedProfile;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedProfile) {
      dispatch(updateUserProfile(editedProfile))
        .then(() => {
          const currentDate = new Date().toISOString();
          const formattedDate = formatDate(currentDate);
          const countryName = countries[editedProfile.user_country as TCountryCode]?.name || 'Unknown';
          setSnackbarMessage(`Your profile is updated as of ${formattedDate}. Country updated to ${countryName}.`);
        })
        .catch((error) => {
          setSnackbarMessage('Failed to update profile: ' + error.message);
        });
      setEditMode(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: 2, maxHeight: '500px', overflowY: 'auto' }}>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
        message={snackbarMessage}
      />
      {status === 'succeeded' && userProfile ? (
        <>
          <Typography variant="h6" gutterBottom>
            Your profile is updated as of {formatDate(userProfile.last_updated)}
          </Typography>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              {Object.entries(userProfile).map(([key, value]) => {
                if (key !== 'user' && key !== 'active' && key !== 'user_image_container' && key !== 'user_profile_image' && key !== 'last_login' && key !== 'last_updated' && key !== 'user_register_date') {
                  if (key === 'user_gender') {
                    return (
                      <FormControl key={key} fullWidth margin="normal">
                        <InputLabel>{key.replace(/user_/g, '').replace(/_/g, ' ').toUpperCase()}</InputLabel>
                        <Select
                          name={key}
                          value={editedProfile ? editedProfile[key] : value || ' ' }
                          onChange={handleSelectChange}
                        >
                          <MenuItem value="M">Male</MenuItem>
                          <MenuItem value="F">Female</MenuItem>
                          <MenuItem value="O">Other</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  } else if (key === 'user_country') {
                    return (
                      <FormControl key={key} fullWidth margin="normal">
                        <InputLabel>{key.replace(/user_/g, '').replace(/_/g, ' ').toUpperCase()}</InputLabel>
                        <Select
                          name={key}
                          value={editedProfile ? (editedProfile[key] as TCountryCode) : ''}
                          onChange={handleSelectChange}
                        >
                          {Object.keys(countries).map((countryCode) => (
                            <MenuItem key={countryCode} value={countryCode as TCountryCode}>
                              {countries[countryCode as TCountryCode].name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    );
                  } else {
                    return (
                      <TextField
                        key={key}
                        label={key.replace(/user_/g, '').replace(/_/g, ' ').toUpperCase()}
                        name={key}
                        value={editedProfile ? editedProfile[key] ?? '' : ''}
                        onChange={handleTextFieldChange}
                        margin="normal"
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ style: { fontWeight: 'bold', color: '#333' } }}
                        InputProps={{ style: { borderRadius: '10px' } }}
                      />
                    );
                  }
                }
                return null;
              })}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                <StyledButton type="submit" variant="contained" color="primary">
                  Save
                </StyledButton>
                <StyledButton onClick={handleEditToggle} variant="contained" color="secondary">
                  Cancel
                </StyledButton>
              </Box>
            </form>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
                <StyledButton onClick={handleEditToggle} variant="contained" color="primary">
                  Edit Profile
                </StyledButton>
              </Box>
              <TableContainer component={Paper} sx={{ borderRadius: '10px', boxShadow: '0px 3px 6px rgba(0,0,0,0.1)' }}>
                <Table aria-label="user profile table">
                  <TableHead>
                    <TableRow>
                      <LightPurpleStyledTableCell>Field</LightPurpleStyledTableCell>
                      <LightPurpleStyledTableCell>Value</LightPurpleStyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(userProfile).map(([key, value]) =>
                      key !== 'user_image_container' && key !== 'user_profile_image' && key !== 'id' ? (
                        <StyledTableRow key={key}>
                          <StyledTableCell>{key.replace(/user_/g, '').replace(/_/g, ' ').toUpperCase()}</StyledTableCell>
                          <StyledTableCell>
                            {key === 'user_website' ? (
                              <a href={value || '#'} target="_blank" rel="noopener noreferrer">
                                {value || 'no data yet'}
                              </a>
                            ) : key.includes('date') || key.includes('login') || key.includes('updated') ? (
                              formatDate(value)
                            ) : (
                              value !== null && value !== undefined ? String(value) : 'no data yet'
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default LoadUserProfileData;
