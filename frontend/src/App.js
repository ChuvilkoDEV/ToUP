import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import AdminPanel from '@components/AdminPanel/AdminPanel'
import Profile from '@components/Profile/Profile';
import Tasks from '@components/Tasks/Tasks';
import Home from '@components/Home/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Routes>
          {isAdmin && <>
            <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
          </>}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
