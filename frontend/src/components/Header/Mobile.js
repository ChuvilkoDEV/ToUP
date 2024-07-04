import React, { useState } from 'react';
import ImageUtils from '../imageUtils';
import './Mobile.css';

const images = ImageUtils.importAllImages(require.context('../../assets/header', false, /\.(svg)$/));

export default function Mobile({ isAuthenticated, handleLogoutClick, handleLoginClick, handleRegistrationClick, toggleTheme }) {
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
                    <button className="close-button" onClick={handleMenuToggle}>
                        <img src={images['close.svg']} alt="Close" />
                    </button>
                    <a href="#" className="mobile-link">Главная</a>
                    <a href="#" className="mobile-link">О нас</a>
                    <a href="#" className="mobile-link">Поддержка</a>
                    <a href="#" className="mobile-link">Соц. Сети</a>
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
    )
}
