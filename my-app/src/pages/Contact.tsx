import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Contact: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contact
      </Typography>
      <Typography variant="body1">
        This is the contact page.
      </Typography>
    </Container>
  );
};

export default Contact;
