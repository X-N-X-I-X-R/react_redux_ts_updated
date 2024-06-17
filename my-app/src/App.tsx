import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Homepage from './components/Homepage';
import Userprofile from './pages/Userprofile';
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

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialState());
  }, [dispatch]);



  if(isAuthenticated){  
    return (
      <Layout_app>
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/homepage" />} />

        </Routes>
      </Layout_app>
    );
  } 
if (!isAuthenticated) {
  return (
    <Layout_app>
      <Routes>
        <Route path="/Autpage" element={<Autpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Layout_app>
  );    
}
}

export default App;