import React from 'react'

export default function Desktop({isAuthenticated, handleLogoutClick, handleLoginClick, handleRegistrationClick, toggleTheme}) {
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
                        <p className="header-authenticated-text">Пользователь авторизован</p>
                        <button className="header-button" onClick={handleLogoutClick}>Выйти</button>
                    </>
                ) : (
                    <>
                        <button className="header-button" onClick={handleLoginClick}>Войти</button>
                        <button className="header-button register-button" onClick={handleRegistrationClick}>Регистрация</button>
                    </>
                )}
                <button className="theme-toggle" onClick={toggleTheme}>Сменить тему</button>
            </nav>
        </>
    )
}
