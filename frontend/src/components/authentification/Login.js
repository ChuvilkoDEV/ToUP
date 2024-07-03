import React, { useEffect } from 'react';
import '../../css/Login.css';
import InputField from './InputField';

import loginLogo from '../../assets/registrationForm/login.svg';
import passwordLogo from '../../assets/registrationForm/password.svg';

const LoginForm = () => (
    <div className="login-form">
        <p className='text-blue-left'>Войдите в аккаунт</p>
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
    <div className="blue-rectangle p-3">
        <p className="overlay-text mb-4">Поднимите уровень своего канала с нами</p>
        
        <div className="container info-block-container">
        <div className="right-block align-self-end info-content">
                {/* <img src={arrow1} alt="logo" className="arrow1-icon" />
                <InfoItem logo={registrationInfoLogo} text="Регистрация" /> */}
            </div>
        </div>
    </div>
);

const Login = ({ onClose }) => {
    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!e.target.closest('.login-window')) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [onClose]);

    return (
        <div className="login-window-overlay">
            <div className="login-window">
                <div className="login-content">
                    <LoginForm />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Login;
