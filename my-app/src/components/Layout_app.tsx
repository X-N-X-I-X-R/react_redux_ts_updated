// Layout_app.tsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../index.css'; // Import your CSS file here

interface LayoutProps {
  children: React.ReactNode;
}

const Layout_app: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar /> {/* Include Navbar */}
      <Sidebar /> {/* Include Sidebar */}
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout_app;