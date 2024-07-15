import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import Tasks from './components/Tasks/Tasks';
import Home from './components/Home/Home';

function App() {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
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
