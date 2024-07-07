import React from 'react'
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/header', false, /\.(svg)$/));

export default function Desktop({ isAuthenticated, handleLogoutClick, handleLoginClick, handleRegistrationClick, toggleTheme }) {
    return (
        <>
            <div className="header-center">
                <a href="#" className="header-link">Главная</a>
                <a href="#" className="header-link">О нас</a>
                <a href="#" className="header-link">Поддержка</a>
                <a href="#" className="header-link">Соц. Сети</a>
            </div>
            <nav className="header-right">
                {isAuthenticated ? (
                    <>
                        <button className="header-button">
                            <img src={images['wallet.svg']} alt="logo" className='mr-5' />
                            13.500 ₽
                        </button>
                        <button className="header-button circle-button" onClick={handleLogoutClick}>
                            <img src={images['notification.svg']} alt="logo" />
                        </button>
                        <button className="header-button circle-button" onClick={handleLogoutClick}>
                            ава
                        </button>
                    </>
                ) : (
                    <>
                        <button className="header-button" onClick={handleLoginClick}>Войти</button>
                        <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
                    </>
                )}
                {/* <button className="theme-toggle" onClick={toggleTheme}>Сменить тему</button> */}
            </nav>
        </>
    )
}
