import React from 'react';
import { CircularProgress } from '@mui/material';

const Loading = () => {
  // Inline styles for the spinner
  const spinnerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    color: 'purple', // Spinner color
  };

  return (
    <div style={spinnerStyles}>
      <CircularProgress style={{ animation: 'spin 2s linear infinite' }} />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;