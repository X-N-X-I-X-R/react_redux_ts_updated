// Import React and styled-components
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Define styled components
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const StyledRow = styled.div`
  text-align: center;
`;

const StyledCol = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyledHeading = styled.h2`
  font-family: 'cursor', sans-serif; // Modern and clean font
  font-size: 2.5rem; // Larger size for emphasis
  color: #333; // Dark grey for better readability
  margin: 20px 0; // Add some space around the heading
  text-transform: uppercase; // Modern look with uppercase letters
  letter-spacing: 1.5px; // Increase letter spacing for a more open look
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

// React component using styled components
const StyledPage: React.FC = () => {
  return (
    <StyledContainer>
      <StyledRow>
        <>
          <img src="src/assets/logo1.png" alt="Hippopotamus Logo" className='logo1-image'/>
          <StyledHeading>We Are Hippopotamus !!</StyledHeading>
          <StyledLink to="/login">
            <StyledButton>Login</StyledButton>
          </StyledLink>
          <StyledLink to="/register">
            <StyledButton style={{ backgroundColor: '#6c757d' }}>Register</StyledButton>
          </StyledLink>
        </>
      </StyledRow>
    </StyledContainer>
  );
};
export default StyledPage;