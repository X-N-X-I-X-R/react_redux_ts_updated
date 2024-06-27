// src/components/Logo.tsx
import React from 'react';
import logo from '../assets/logo.jpeg'; 

const Logo: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}> {/* Inline CSS for logo container */}
      <img src={logo} alt="Logo" style={{ maxWidth: '25%', maxHeight: 'auto',paddingTop:'1%' }} /> {/* Inline CSS for image */}
    </div>
  );
};

export default Logo;