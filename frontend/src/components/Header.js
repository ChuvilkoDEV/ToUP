import React, { useState, useContext } from 'react';
import '../css/Header.css';
import { ThemeContext } from '../context/ThemeContext';
import Registration from './authentification/Registration';
import Login from './authentification/Login';
import ImageUtils from './imageUtils';

const images = ImageUtils.importAllImages(require.context('../assets/header', false, /\.(svg)$/));

const Header = () => {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleRegistrationClick = () => {
        setShowRegistration(true);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleClose = () => {
        setShowRegistration(false);
        setShowLogin(false);
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={`header ${theme}`}>
            <div className="header-left">
                <h1 className="header-title">
                    <img src={images['ToUP.svg']} alt="logo" />
                </h1>
            </div>
            <div className="header-center">
                {/* <a href="#" className="header-link">Главная</a>
                <a href="#" className="header-link">О нас</a>
                <a href="#" className="header-link">Поддержка</a>
                <a href="#" className="header-link">Соц. Сети</a> */}
            </div>
            <nav className="header-right">
                <button className="header-button" onClick={handleLoginClick}>Войти</button>
                <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
                <button className="theme-toggle" onClick={toggleTheme}>Сменить тему</button>
            </nav>
            <button className="hamburger-button" onClick={handleMenuToggle}>
                <img src={images['hamburger.svg']} alt="Menu" />
            </button>
            {menuOpen && (
                <div className="mobile-menu">
                    <a href="#" className="mobile-link">Главная</a>
                    <a href="#" className="mobile-link">О нас</a>
                    <a href="#" className="mobile-link">Поддержка</a>
                    <a href="#" className="mobile-link">Соц. Сети</a>
                    <button className="mobile-button" onClick={handleLoginClick}>Войти</button>
                    <button className="mobile-button" onClick={handleRegistrationClick}>Регистрация</button>
                </div>
            )}
            {showRegistration && <Registration onClose={handleClose} />}
            {showLogin && <Login onClose={handleClose} />}
        </header>
    );
}

export default Header;
