import React, { useState } from 'react';
import '../css/Header.css'; 
import Registration from './Registration';

const Header = () => {
    const [showRegistration, setShowRegistration] = useState(false);

    const handleRegistrationClick = () => {
        setShowRegistration(true);
    };

    const handleClose = () => {
        setShowRegistration(false);
    };

    return (
        <header className="header">
            <div className="header-left">
                <h1 className="header-title">ToUP</h1>
            </div>
            <div className='header-center'>
                <a href="#" className="header-link">Главная</a>
                <a href="#" className="header-link">О нас</a>
                <a href="#" className="header-link">Поддержка</a>
                <a href="#" className="header-link">Соц. Сети</a>
            </div>
            <nav className="header-right">
                <button className="header-button">Войти</button>
                <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
            </nav>
            {showRegistration && <Registration onClose={handleClose} />}
        </header>
    );
}

export default Header;
