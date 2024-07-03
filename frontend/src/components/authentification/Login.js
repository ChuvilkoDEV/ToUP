import React, { useEffect } from 'react';
import './Login.css';
import InputField from './InputField';
import ImageUtils from '../imageUtils'; 

// const images = ImageUtils.importAllImages(require.context('../../assets/auth', false, /\.(svg)$/));
import loginLogo from '../../assets/auth/login.svg';
import passwordLogo from '../../assets/auth/password.svg';

const LoginForm = () => (
    <div className="auth-form">
        <p className="text-blue-left">Войдите в аcккаунт</p>
        <h2>МЫ РАДЫ ВАС ВИДЕТЬ СНОВА</h2>
        <form>
            <InputField label="Email" type="email" placeholder="Ваша почта" logo={loginLogo} />
            <InputField label="Пароль" type="password" placeholder="Введите пароль" logo={passwordLogo} />
            <button type="submit">Войти</button>
        </form>
        <p>Нет аккаунта? <a href="#">Регистрация</a></p>
    </div>
);

const InfoBlock = () => (
    <div className="login-info-block-wrapper">
        <p className="overlay-text">Поднимите уровень своего канала с нами</p>
        <div className="login-info-block-container">
            <div className="login-info-block block1">
                <p className="login-info-block-title">Более 5000 пользователей</p>
            </div>
            <div className="login-info-block block2">
                
            </div>
            <div className="login-info-block block3">
                
            </div>
            <div className="login-info-block block4">
                
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
