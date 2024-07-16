import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Registration from '@components/authentification/Registration';
import Login from '@components/authentification/Login';
import { AuthContext } from '../../context/AuthContext';
import Desktop from './Header.Desktop';
import Mobile from './Header.Mobile';
import './Header.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/header', false, /\.(svg)$/));

const Header = () => {
    const { login, logout } = useContext(AuthContext);
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

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
        navigate('/profile');
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
