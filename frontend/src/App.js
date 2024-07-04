import React, { useContext }  from 'react';
import Header from './components/Header';
import { ThemeContext } from './context/ThemeContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Header toggleTheme={toggleTheme}/>
    </div>
  );
}

export default App;
