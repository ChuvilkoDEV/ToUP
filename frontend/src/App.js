import React, { useContext } from 'react';
import Header from './components/Header/Header';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';
import Tasks from './components/Tasks/Tasks';


function App() {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className={`App ${theme}`}>
      <Header />

      {isAuthenticated ? (
        <Profile />
      ) : (
        <>
        <Tasks/>
        </>
      )}
      
      <Footer />
    </div>
  );
}

export default App;
