// src/components/authentification/Login.js

import React, { useEffect } from 'react';
import './Login.css';
import InputField from './InputField';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/auth', false, /\.(svg)$/));

const LoginForm = () => (
    <div className="auth-form">
        <p className="text-blue-left">Войдите в аккаунт</p>
        <h2>МЫ РАДЫ ВАС ВИДЕТЬ СНОВА</h2>
        <form className='mt-4'>
            <InputField label="Email" type="email" placeholder="Ваша почта" logo={images['login.svg']} />
            <InputField label="Пароль" type="password" placeholder="Введите пароль" logo={images['password.svg']} />
            <button type="submit" className='mt-4'>Войти</button>
        </form>
        <p>Нет аккаунта? <a href="#">Регистрация</a></p>
    </div>
);

const InfoBlock = () => (
    <div className="login-info-block-wrapper">
        <p className="overlay-text">Поднимите уровень своего канала с нами</p>
        <div className="login-info-block-container">
            <div className="login-info-block block1">
                <img src={images['check.svg']} alt="logo" />
                <p className="login-info-block-title">Более 5000 пользователей</p>
            </div>
            <div className="login-info-block block2">
                <img src={images['community.svg']} alt="logo"/>
                <p className="login-info-block-title">Охват широкой аудитории</p>
                <p className="login-info-block-description">Наш сервис охватывает огромное количество тематических</p>
            </div>
            <div className="login-info-block block3">
                <img src={images['trophy.svg']} alt="logo"/>
                <div className="login-info-block-title">N1 в сфере накрутки</div>
            </div>
            <div className="login-info-block block4">
                <img src={images['check.svg']} alt="logo" />
                <span className="login-info-block-title">Бонусы для новых пользователей</span>
            </div>
        </div>
    </div>
);

const Login = ({ onClose }) => {
    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!e.target.closest('.auth-window')) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [onClose]);

    return (
        <div className="auth-window-overlay">
            <div className="auth-window">
                <div className="auth-content">
                    <LoginForm />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Login;
