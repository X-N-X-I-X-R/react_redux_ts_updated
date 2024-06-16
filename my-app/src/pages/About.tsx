import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const About: React.FC = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography variant="body1">
        This is the about page.
      </Typography>
    </Container>
  );
};

export default About;
