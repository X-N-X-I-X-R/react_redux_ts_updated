import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecFilings } from '../store/slicers/secFilingsSlice';
import { AppDispatch, RootState } from 'src/store';
import Logo from '../components/Logo';
import '../App.css';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Container, Typography, Box, Snackbar, Paper } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Loading from '../components/Loader';
import styled from 'styled-components';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledMenuItem = styled(MenuItem)({
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const SecFilingsForm: React.FC = () => {
  const [ticker, setTicker] = useState('');
  const [reportType, setReportType] = useState('8-K'); // Default to '8-K'
  const [afterDate, setAfterDate] = useState('2020-01-01'); // Default start date
  const [beforeDate, setBeforeDate] = useState('2024-01-01'); // Default end date
  const [showImage, setShowImage] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { filings, loading, error } = useSelector((state: RootState) => state.secFilings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Begin loading

    dispatch(fetchSecFilings({ ticker, report_type: reportType, after_date: afterDate, before_date: beforeDate }))
      .unwrap()
      .finally(() => {
        setIsLoading(false); // End loading
      });

    setShowImage(true);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  useEffect(() => {
    if (filings) {
      console.log('Filings received from server:', filings);
    }
    if (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000); // Hide error after 5 seconds
    }
  }, [filings, error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      <Box mt={4} p={3} boxShadow={7} borderRadius={7} bgcolor="background.paper">
        <Typography variant="h4" align="center" gutterBottom>
          Fetch SEC Filings
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ticker"
            id="ticker"
            name="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="report_type_label">Report Type</InputLabel>
            <Select
              labelId="report_type_label"
              id="report_type"
              name="report_type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              required
            >
              <StyledMenuItem value="8-K">8-K</StyledMenuItem>
              <StyledMenuItem value="10-K">10-K</StyledMenuItem>
              <StyledMenuItem value="10-Q">10-Q</StyledMenuItem>
              <StyledMenuItem value="13F-HR">13F-HR</StyledMenuItem>
              <StyledMenuItem value="13F-NT">13F-NT</StyledMenuItem>
              <StyledMenuItem value="20-F">20-F</StyledMenuItem>
              <StyledMenuItem value="40-F">40-F</StyledMenuItem>
              <StyledMenuItem value="SC 13G">SC 13G</StyledMenuItem>
              <StyledMenuItem value="SD">SD</StyledMenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="After Date"
            type="date"
            id="after_date"
            name="after_date"
            value={afterDate}
            onChange={(e) => setAfterDate(e.target.value)}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Before Date"
            type="date"
            id="before_date"
            name="before_date"
            value={beforeDate}
            onChange={(e) => setBeforeDate(e.target.value)}
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Fetch
          </Button>
        </form>
      </Box>
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
      >
        <Alert onClose={() => setShowNotification(false)} severity="warning" sx={{ width: '100%' }}>
          <InfoIcon /> Fetching the latest report for the specified period...
        </Alert>
      </Snackbar>
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={() => setShowError(false)}
      >
        <Alert onClose={() => setShowError(false)} severity="error" sx={{ width: '100%' }}>
          <ErrorIcon /> 
          <div>
            No data found for the specified dates.<br />
            There might not be a report available for the specified ticker.<br />
            Please select a different date range or ticker.
          </div>
        </Alert>
      </Snackbar>
      {showImage && <Logo />}
      {filings && (
        <Box mt={4}>
          <Paper elevation={7} sx={{ p: 2, maxHeight: '500px', overflow: 'auto', width: '100%' }}>
            <div dangerouslySetInnerHTML={{ __html: filings }} />
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default SecFilingsForm;
