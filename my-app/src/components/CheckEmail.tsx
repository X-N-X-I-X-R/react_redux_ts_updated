// src/components/CheckEmail.tsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;
`;

const Message = styled.div`
  text-align: center;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #343a40;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
`;

const Image = styled.img`
  width: 100%;
  max-width: 300px;
  margin-bottom: 2rem;
`;


const CheckEmail: React.FC = () => {
  return (
    <Container>
      <Message>
           <Title>HIPPOPOTAMUS</Title>
        <Image src="src/assets/hippo.jpeg" alt="Hippo" />
      
        <Title>Registration Successful</Title>
        <Text>Please check your email to activate your account.</Text>
      </Message>
    </Container>
  );
}

export default CheckEmail;