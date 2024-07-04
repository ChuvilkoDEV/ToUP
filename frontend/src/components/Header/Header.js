import React, { useState, useEffect } from 'react';
import './Header.css';
import Desktop from './Desktop';
import Mobile from './Mobile';
import Registration from '../authentification/Registration';
import Login from '../authentification/Login';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/header', false, /\.(svg)$/));

const Header = ({ toggleTheme }) => {
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleRegistrationClick = () => {
        setShowRegistration(true);
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegistration(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const handleClose = () => {
        setShowRegistration(false);
        setShowLogin(false);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleRegistrationSuccess = () => {
        setShowRegistration(false);
        setShowLogin(true);
    };

    return (
        <header className='header'>
            <div className="header-left">
                <h1 className="header-title">
                    T
                    <img src={images['telegram.svg']} alt="logo" />
                    UP
                </h1>
            </div>
            <Desktop
                isAuthenticated={isAuthenticated}
                handleLogoutClick={handleLogoutClick}
                handleLoginClick={handleLoginClick}
                handleRegistrationClick={handleRegistrationClick}
                toggleTheme={toggleTheme}
            />

            <Mobile
                isAuthenticated={isAuthenticated}
                handleLogoutClick={handleLogoutClick}
                handleLoginClick={handleLoginClick}
                handleRegistrationClick={handleRegistrationClick}
            />

            {showRegistration && <Registration onClose={handleClose} onRegistrationSuccess={handleRegistrationSuccess} />}
            {showLogin && <Login onClose={handleClose} onLoginSuccess={handleLoginSuccess} onSwitchToRegister={handleRegistrationClick} />}
        </header>
    );
};

export default Header;
