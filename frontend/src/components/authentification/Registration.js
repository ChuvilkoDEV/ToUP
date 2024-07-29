import React, { useState, useEffect } from 'react';
import InputField from '@components/shared/InputField';
import ImageUtils from '../imageUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';
import axios from 'axios';

const images = ImageUtils.importAllImages(require.context('@assets/auth', false, /\.(svg)$/));

const RegistrationForm = ({ onRegistrationSuccess }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [channel, setChannel] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !name || !channel || !password || !confirmPassword) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Пароли не совпадают.');
            return;
        }
        try {
            const response = await axios.post('http://147.45.111.226:8001/api/reg', {
                email,
                password,
                name,
                channels: channel
            });
            console.log(response.data);
            onRegistrationSuccess();
        } catch (err) {
            console.error(err);
            setError('Ошибка при регистрации.');
        }
    };

    return (
        <div className="auth-form">
            <p className="text-blue-left">Создайте аккаунт</p>
            <h2>ДОБРО ПОЖАЛОВАТЬ в ToUP</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    type="email"
                    placeholder="Ваша почта"
                    logo={images['mail.svg']}
                    value={email}
                    handleChange={(e) => setEmail(e.target.value)}
                />
                <div className="registration-email-channel-container">
                    <InputField
                        label="Имя"
                        type="text"
                        placeholder="Напишите имя"
                        logo={images['login.svg']}
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <InputField
                        label="Канал"
                        type="text"
                        placeholder="Ссылка на канал"
                        logo={images['telegram.svg']}
                        value={channel}
                        handleChange={(e) => setChannel(e.target.value)}
                    />
                </div>
                <InputField
                    label="Пароль"
                    type="password"
                    placeholder="Придумайте пароль"
                    logo={images['password.svg']}
                    value={password}
                    handleChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    label="Повторите пароль"
                    type="password"
                    placeholder="Повторите пароль"
                    logo={images['password.svg']}
                    value={confirmPassword}
                    handleChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Создать аккаунт</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Уже есть аккаунт? <a href="#" onClick={onRegistrationSuccess}>Войти</a></p>
        </div>
    );
};

const InfoItem = ({ logo, text, leftArrow = null, rightArrow = null, isMargin = false }) => (
    <div className={`registration-info-content ${leftArrow ? 'mr-0' : 'ml-0'}`}>
        {leftArrow}
        <div className={`registration-info-block ${isMargin ? 'mb-0' : ''}`}>
            <img src={logo} alt="logo" className="registration-info-logo" />
            {text}
        </div>
        {rightArrow}
    </div>
);

const InfoBlock = () => (
    <div className="blue-rectangle p-3">
        <p className="overlay-text mb-4">Увеличьте свою аудиторию с нами</p>
        <div className="container registration-info-block-container">
            <InfoItem logo={images['registrationInfo.svg']} text="Регистрация"
                leftArrow={<img src={images['arrow1.svg']} alt="logo" className="registration-arrow1-icon" />} />
            <InfoItem logo={images['subscribersInfo.svg']} text="Выбор кол-ва подписчиков"
                rightArrow={<img src={images['arrow2.svg']} alt="logo" className="registration-arrow2-icon" />} />
            <InfoItem logo={images['wallet.svg']} text="Пополнить счет"
                leftArrow={<img src={images['arrow3.svg']} alt="logo" className="registration-arrow3-icon" />} />
            <InfoItem logo={images['task.svg']} text="Добавить задачу" isMargin={true} />
        </div>
    </div>
);

const Registration = ({ onClose, onRegistrationSuccess }) => {
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
                    <RegistrationForm onRegistrationSuccess={onRegistrationSuccess} />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Registration;
