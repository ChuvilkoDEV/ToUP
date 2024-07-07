import React, { useContext } from 'react';
import Header from './components/Header/Header';
import { ThemeContext } from './context/ThemeContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer/Footer';
import Profile from './components/Profile/Profile';


function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Header toggleTheme={toggleTheme} />
      <Profile />
      <Footer />
    </div>
  );
}

export default App;
