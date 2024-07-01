import React from 'react';
import '../css/Header.css'; // Подключаем CSS файл

const Header = () => {
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
                <button className="header-button register-button">Регистрация</button>
            </nav>
        </header>
    );
}

export default Header;
