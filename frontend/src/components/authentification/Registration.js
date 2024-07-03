import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';

import './Registration.css';
import loginLogo from '../../assets/registrationForm/login.svg';
import mailLogo from '../../assets/registrationForm/mail.svg';
import telegramLogo from '../../assets/registrationForm/telegram.svg';
import passwordLogo from '../../assets/registrationForm/password.svg';
import arrow1 from '../../assets/registrationForm/arrow1.svg';
import arrow2 from '../../assets/registrationForm/arrow2.svg';
import arrow3 from '../../assets/registrationForm/arrow3.svg';
import registrationInfoLogo from '../../assets/registrationForm/registrationInfo.svg';
import subscribersInfoLogo from '../../assets/registrationForm/subscribersInfo.svg';
import walletInfoLogo from '../../assets/registrationForm/wallet.svg';
import taskInfoLogo from '../../assets/registrationForm/task.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => (
    <div className="auth-form">
        <p className="text-blue-left">Создайте аккаунт</p>
        <h2>ДОБРО ПОЖАЛОВАТЬ в ToUP</h2>
        <form>
            <InputField label="Email" type="email" placeholder="Ваша почта" logo={mailLogo} />
            <div className="registration-email-channel-container">
                <InputField label="Имя" type="text" placeholder="Напишите имя" logo={loginLogo} />
                <InputField label="Канал" type="text" placeholder="Ссылка на канал" logo={telegramLogo} />
            </div>
            <InputField label="Пароль" type="password" placeholder="Придумайте пароль" logo={passwordLogo} />
            <InputField label="Повторите пароль" type="password" placeholder="Повторите пароль" logo={passwordLogo} />
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
            <InfoItem logo={registrationInfoLogo} text="Регистрация" leftArrow={<img src={arrow1} alt="logo" className="registration-arrow1-icon" />}/>
            <InfoItem logo={subscribersInfoLogo} text="Выбор кол-ва подписчиков" rightArrow={<img src={arrow2} alt="logo" className="registration-arrow2-icon" />}/>
            <InfoItem logo={walletInfoLogo} text="Пополнить счет" leftArrow={<img src={arrow3} alt="logo" className="registration-arrow3-icon" />}/>
            <InfoItem logo={taskInfoLogo} text="Добавить задачу" isMargin={true} />
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
