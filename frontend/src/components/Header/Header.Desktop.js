import React, { useContext } from 'react'
import ImageUtils from '../imageUtils';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const images = ImageUtils.importAllImages(require.context('../../assets/header', false, /\.(svg)$/));

export default function Desktop({ handleLogoutClick, handleLoginClick, handleRegistrationClick }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <>
            <div className="header-center">
                {isAuthenticated ? (
                    <>
                        <a href="#" className="header-link">
                            <img src={images['profile.svg']} alt="logo" className='mr-5' />
                            Личный кабинет
                        </a>
                        <a href="#" className="header-link">
                            <img src={images['clock.svg']} alt="logo" className='mr-5' />
                            Управление задачами
                        </a>
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
                <button className="hiding-button" lassName="theme-toggle" onClick={toggleTheme}>
                    <img src={images['lightTheme.svg']} alt="logo" className='mr-5' />
                </button>
                {isAuthenticated ? (
                    <>
                        <button className="header-button narrow-button">
                            <img src={images['wallet.svg']} alt="logo" className='mr-5' />
                            13.500 ₽
                        </button>
                        <button className="header-button hiding-button" onClick={handleLogoutClick}>
                            <img src={images['notification.svg']} alt="logo" />
                        </button>
                        <button className="header-button hiding-button" onClick={handleLogoutClick}>
                            <img src={images['userProfile.svg']} alt="logo" />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="header-button" onClick={handleLoginClick}>Войти</button>
                        <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
                    </>
                )}
            </nav>
        </>
    )
}
