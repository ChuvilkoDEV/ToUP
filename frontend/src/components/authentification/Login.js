import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Login.css';
import InputField from './InputField';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/auth', false, /\.(svg)$/));

const LoginForm = ({ onClose, onLoginSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://147.45.111.226:8001/api/auth', { email, password });
            if (response.data.status === false) {
                setError(response.data.msg);
            } else {
                localStorage.setItem('token', response.data.token);
                onLoginSuccess();
                onClose();
            }
        } catch (err) {
            console.error(err);
            setError('Ошибка при авторизации');
        }
    };

    return (
        <div className="auth-form">
            <p className="text-blue-left">Войдите в аккаунт</p>
            <h2>МЫ РАДЫ ВАС ВИДЕТЬ СНОВА</h2>
            <form className='mt-4' onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Ваша почта"
                    logo={images['login.svg']}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    logo={images['password.svg']}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className='mt-4'>Войти</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Нет аккаунта? <a href="#" onClick={onSwitchToRegister}>Регистрация</a></p>
        </div>
    );
};

const InfoBlock = () => (
    <div className="blue-rectangle">
        <p className="overlay-text">Поднимите уровень своего канала с нами</p>
        <div className="login-info-block-container">
            <div className="login-info-block block1">
                <img src={images['check.svg']} alt="logo" />
                <span className="login-info-block-title">Более 5000 пользователей</span>
            </div>
            <div className="login-info-block block2">
                <img src={images['community.svg']} alt="logo" />
                <span className="login-info-block-title">Охват широкой аудитории</span>
                <span className="login-info-block-description">Наш сервис охватывает огромное количество тематических</span>
            </div>
            <div className="login-info-block block3">
                <img src={images['trophy.svg']} alt="logo" />
                <span className="login-info-block-title">N1 в сфере накрутки</span>
            </div>
            <div className="login-info-block block4">
                <img src={images['check.svg']} alt="logo" />
                <span className="login-info-block-title">Бонусы для новых пользователей</span>
            </div>
        </div>
    </div>
);

const Login = ({ onClose, onLoginSuccess, onSwitchToRegister }) => {
    const loginRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (loginRef.current && !loginRef.current.contains(e.target)) {
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
            <div className="auth-window" ref={loginRef}>
                <div className="auth-content">
                    <LoginForm onClose={onClose} onLoginSuccess={onLoginSuccess} onSwitchToRegister={onSwitchToRegister} />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Login;
