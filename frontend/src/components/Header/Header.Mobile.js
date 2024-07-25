import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import './Mobile.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/header', false, /\.(svg)$/));

export default function Mobile({ handleLogoutClick, handleLoginClick, handleRegistrationClick }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLoginClickWithToggle = () => {
    handleLoginClick();
    handleMenuToggle();
  };

  const handleRegistrationClickWithToggle = () => {
    handleRegistrationClick();
    handleMenuToggle();
  };

  return (
    <>
      <button className="hamburger-button" onClick={handleMenuToggle}>
        <img src={images['hamburger.svg']} alt="Menu" />
      </button>
      {menuOpen && (
        <div className="mobile-menu">
          <h1 className="mobile-header-title">
            T
            <img src={images['telegram.svg']} alt="logo" />
            UP
          </h1>
          <div className="header-buttons">
            <img src={images['lightTheme.svg']} alt="theme-toggle" className="menu-theme-toggle" onClick={toggleTheme} />
            <button className="header-button narrow-button">
              <img src={images['wallet.svg']} alt="wallet" className="mr-5" />
              13.500 ₽
            </button>
            <button className="header-button hiding-button">
              <img src={images['notification.svg']} alt="notifications" />
            </button>
            <button className="close-button" onClick={handleMenuToggle}>
              <img src={images['close.svg']} alt="Close" />
            </button>
          </div>
          <div className="menu-refs">
            {isAuthenticated ? (
              <>
                <div className="profile-section">
                  <img src={images['userProfile.svg']} alt="Profile" className="profile-icon" />
                  <span className="profile-name">Мухин Дмитрий</span>
                </div>
                <Link to="/profile" className="mobile-link">
                  <img src={images['profile.svg']} alt="logo" className='mr-5' />
                  Личный кабинет
                </Link>
                <Link to="/tasks" className="mobile-link">
                  <img src={images['clock.svg']} alt="logo" className='mr-5' />
                  Управление задачами
                </Link>
                <a href="#" className="mobile-link">
                  <img src={images['support.svg']} alt="logo" className='mr-5' />
                  Поддержка
                </a>
                <a href="#" className="mobile-link">
                  <img src={images['FaQ.svg']} alt="logo" className='mr-5' />
                  FAQ
                </a>
                <a href="#" className="mobile-link">
                  <img src={images['star.svg']} alt="logo" className='mr-5' />
                  Бонусы
                </a>
              </>
            ) : (
              <>
                <a href="#" className="mobile-link">Главная</a>
                <a href="#" className="mobile-link">О нас</a>
                <a href="#" className="mobile-link">Поддержка</a>
                <a href="#" className="mobile-link">Соц. Сети</a>
              </>
            )}
          </div>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <button className="mobile-button" onClick={handleLogoutClick}>Выйти</button>
            ) : (
              <>
                <button className="mobile-button" onClick={handleLoginClickWithToggle}>Войти</button>
                <button className="mobile-button register-button" onClick={handleRegistrationClickWithToggle}>Регистрация</button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
