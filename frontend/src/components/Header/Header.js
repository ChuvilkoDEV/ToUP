import React, { useState, useContext } from 'react';
import './Header.css';
import Desktop from './Header.Desktop';
import Mobile from './Header.Mobile';
import Registration from '../authentification/Registration';
import Login from '../authentification/Login';
import ImageUtils from '../imageUtils';
import { AuthContext } from '../../context/AuthContext';

const images = ImageUtils.importAllImages(require.context('../../assets/header', false, /\.(svg)$/));

const Header = () => {
    const { login, logout } = useContext(AuthContext);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleRegistrationClick = () => {
        setShowRegistration(true);
        setShowLogin(false);
    };

    const handleLoginClick = () => {
        setShowLogin(true);
        setShowRegistration(false);
    };

    const handleLogoutClick = () => {
        logout();
    };

    const handleClose = () => {
        setShowRegistration(false);
        setShowLogin(false);
    };

    const handleLoginSuccess = () => {
        login();
        setShowLogin(false);
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
                handleLogoutClick={handleLogoutClick}
                handleLoginClick={handleLoginClick}
                handleRegistrationClick={handleRegistrationClick}
            />

            <Mobile
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
