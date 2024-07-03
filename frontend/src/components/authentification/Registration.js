import React, { useEffect } from 'react';
import InputField from './InputField';
import ImageUtils from '../imageUtils'; // Используем алиас
import 'bootstrap/dist/css/bootstrap.min.css';
import './Registration.css';

// Импорт всех изображений
const images = ImageUtils.importAllImages(require.context('../../assets/auth', false, /\.(svg)$/));

const RegistrationForm = () => (
    <div className="auth-form">
        <p className="text-blue-left">Создайте аккаунт</p>
        <h2>ДОБРО ПОЖАЛОВАТЬ в ToUP</h2>
        <form>
            <InputField label="Email" type="email" placeholder="Ваша почта" logo={images['mail.svg']} />
            <div className="registration-email-channel-container">
                <InputField label="Имя" type="text" placeholder="Напишите имя" logo={images['login.svg']} />
                <InputField label="Канал" type="text" placeholder="Ссылка на канал" logo={images['telegram.svg']} />
            </div>
            <InputField label="Пароль" type="password" placeholder="Придумайте пароль" logo={images['password.svg']} />
            <InputField label="Повторите пароль" type="password" placeholder="Повторите пароль" logo={images['password.svg']} />
            <button type="submit">Создать аккаунт</button>
        </form>
        <p>Уже есть аккаунт? <a href="#">Войти</a></p>
    </div>
);

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
            <InfoItem logo={images['registrationInfo.svg']} text="Регистрация" leftArrow={<img src={images['arrow1.svg']} alt="logo" className="registration-arrow1-icon" />} />
            <InfoItem logo={images['subscribersInfo.svg']} text="Выбор кол-ва подписчиков" rightArrow={<img src={images['arrow2.svg']} alt="logo" className="registration-arrow2-icon" />} />
            <InfoItem logo={images['wallet.svg']} text="Пополнить счет" leftArrow={<img src={images['arrow3.svg']} alt="logo" className="registration-arrow3-icon" />} />
            <InfoItem logo={images['task.svg']} text="Добавить задачу" isMargin={true} />
        </div>
    </div>
);

const Registration = ({ onClose }) => {
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
                    <RegistrationForm />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Registration;
