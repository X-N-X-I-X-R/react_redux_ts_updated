// src/components/Header.tsx
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #dee2e6;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #343a40;
`;

const Navigation = styled.nav`
  a {
    margin-left: 1rem;
    color: #007bff;
    text-decoration: none;

    &:hover {
      color: #0056b3;
    }
  }
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Dashboard</Title>
      <Navigation>
        <a href="#profile">Profile</a>
        <a href="#logout">Logout</a>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;