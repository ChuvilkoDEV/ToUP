import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/header', false, /\.(svg)$/));

export default function Desktop({ handleLogoutClick, handleLoginClick, handleRegistrationClick }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const getLinkClass = (path) => {
        return location.pathname === path ? 'header-link active' : 'header-link';
    };

    return (
        <>
            <div className="header-center">
                {isAuthenticated ? (
                    <>
                        <Link to="/profile" className={getLinkClass('/profile')}>
                            <img src={images['profile.svg']} alt="logo" className='mr-5' />
                            Личный кабинет
                        </Link>
                        <Link to="/tasks" className={getLinkClass('/tasks')}>
                            <img src={images['clock.svg']} alt="logo" className='mr-5' />
                            Управление задачами
                        </Link>
                        <a href="#" className="header-link">
                            <img src={images['support.svg']} alt="logo" className='mr-5' />
                            Поддержка
                        </a>
                        <a href="#" className="header-link optional">
                            <img src={images['FaQ.svg']} alt="logo" className='mr-5' />
                            FAQ
                        </a>
                        <a href="#" className="header-link optional">
                            <img src={images['star.svg']} alt="logo" className='mr-5' />
                            Бонусы
                        </a>
                    </>
                ) : (
                    <>
                        <a href="#" className="header-link">Главная</a>
                        <a href="#" className="header-link">О нас</a>
                        <a href="#" className="header-link">Поддержка</a>
                        <a href="#" className="header-link">Соц. Сети</a>
                    </>
                )}
            </div>

            <nav className="header-right">
                {isAuthenticated ? (
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
                        {isMenuOpen && (
                            <div className="user-dropdown-menu">
                                <div className="profile-section">
                                    <img src={images['userProfile.svg']} alt="Profile" className="profile-icon" />
                                    <span className="profile-name">Мухин Дмитрий</span>
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
                        )}
                    </>
                ) : (
                    <>
                        <button className="hiding-button" lassName="theme-toggle" onClick={toggleTheme}>
                            <img src={images['lightTheme.svg']} alt="logo" className='mr-5' />
                        </button>
                        <button className="header-button" onClick={handleLoginClick}>Войти</button>
                        <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
                    </>
                )}
            </nav>
        </>
    )
}
