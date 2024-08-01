import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

import { HandySvg } from 'handy-svg';
import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/header', false, /\.(svg)$/));

export default function Desktop({ handleLogoutClick, handleLoginClick, handleRegistrationClick }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const getLinkClass = (path) => {
    return location.pathname === path ? 'header-link active' : 'header-link';
  };

  const AuthenticatedLinks = () => (
    <>
      <Link to="/profile" className={getLinkClass('/profile')}>
        <HandySvg src={images['profile.svg']} className="header-icon mr-5" />
        Личный кабинет
      </Link>
      <Link to="/tasks" className={getLinkClass('/tasks')}>
        <HandySvg src={images['clock.svg']} className="header-icon mr-5" />
        Управление задачами
      </Link>
      <a href="#" className="header-link">
        <HandySvg src={images['support.svg']} className="header-icon mr-5" />
        Поддержка
      </a>
      <a href="#" className="header-link optional">
        <HandySvg src={images['FaQ.svg']} className="header-icon mr-5" />
        FAQ
      </a>
      <a href="#" className="header-link optional">
        <HandySvg src={images['star.svg']} className="header-icon mr-5" />
        Бонусы
      </a>
    </>
  );

  const GuestLinks = () => (
    <>
      <a href="#" className="header-link">Главная</a>
      <a href="#" className="header-link">О нас</a>
      <a href="#" className="header-link">Поддержка</a>
      <a href="#" className="header-link">Соц. Сети</a>
    </>
  );

  const HeaderCenter = () => {
    return (
      <div className="header-center">
        {isAuthenticated ? <AuthenticatedLinks getLinkClass={getLinkClass} /> : <GuestLinks />}
      </div>
    );
  };

  const ProfileMenu = () => (
    <div className="user-dropdown-menu">
      <div className="profile-section">
        <img src={images['userProfile.svg']} alt="Profile" className="profile-icon" />
        <span className="profile-name">Мухин Дмитрий</span>
        <img src={images['lightTheme.svg']} alt="logo" className='menu-theme-toggle' onClick={toggleTheme} />
      </div>
      <div className="dropdown-item">
        <img src={images['myWallet.svg']} alt="logo" />
        Мой счет
      </div>
      <div className="dropdown-item">
        <img src={images['settings.svg']} alt="logo" />
        Настройки
      </div>
      <button className="header-button logout-button" onClick={handleLogoutClick}>Выйти</button>
    </div>
  );

  const AuthenticatedRight = () => (
    <>
      <button className="header-button narrow-button">
        <img src={images['wallet.svg']} alt="logo" className='mr-5' />
        13.500 ₽
      </button>
      <button className="header-button hiding-button">
        <img src={images['notification.svg']} alt="logo" />
      </button>
      <button className="header-button hiding-button" onClick={toggleMenu}>
        <img src={images['userProfile.svg']} alt="logo" />
      </button>
      {isProfileMenuOpen && <ProfileMenu toggleTheme={toggleTheme} handleLogoutClick={handleLogoutClick} />}
    </>
  );

  const GuestRight = () => (
    <>
      <button className="hiding-button theme-toggle" onClick={toggleTheme}>
        <img src={images['lightTheme.svg']} alt="logo" className='mr-5' />
      </button>
      <button className="header-button" onClick={handleLoginClick}>Войти</button>
      <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
    </>
  );

  const HeaderRight = () => {
    return (
      <nav className="header-right">
        {isAuthenticated ? (
          <AuthenticatedRight
            isProfileMenuOpen={isProfileMenuOpen}
            toggleMenu={toggleMenu}
            toggleTheme={toggleTheme}
            handleLogoutClick={handleLogoutClick}
          />
        ) : (
          <GuestRight
            toggleTheme={toggleTheme}
            handleLoginClick={handleLoginClick}
            handleRegistrationClick={handleRegistrationClick}
          />
        )}
      </nav>
    );
  };

  return (
    <>
      <HeaderCenter />
      <HeaderRight />
    </>
  );
}
