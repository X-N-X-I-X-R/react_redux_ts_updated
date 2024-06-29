// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './components/Homepage';
import CheckEmail from './components/CheckEmail';
import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './components/Dashboard';
import Layout_app from './components/Layout_app';
import Autpage from './pages/Autpage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { setInitialState } from './store/slicers/authSlice';
import { useEffect } from 'react';
import Chat from './pages/Chat';
import VideoChat from './pages/VideoChat';
import React from 'react';
import SecFilingsForm from './pages/SecFilingsForm';
import LoadUserProfileData from './components/LoadUserProfileData';
import LogoutButton from './components/LogoutButton';
import ImagesManager from './components/ImagesManager';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, [dispatch]);

  if (isAuthenticated) {
    return (
      <Layout_app>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/UserProfile" element={<LoadUserProfileData />} />
            <Route path="/images" element={<ImagesManager/>} /> {/* Add ImagesManager route */}

          <Route path="/homepage" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videoChat" element={<VideoChat />} />
          <Route path="*" element={<Navigate to="/homepage" />} />
          <Route path="/secFilings" element={<SecFilingsForm/>} />
          <Route path="/logout" element={<LogoutButton/>} />
        </Routes>
      </Layout_app>
    );
  } else {
    return (
      <Layout_app>
        <Routes>
          <Route path="/Autpage" element={<Autpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="*" element={<Navigate to="/Autpage" />} />
        </Routes>
      </Layout_app>
    );
  }
};

export default App;
