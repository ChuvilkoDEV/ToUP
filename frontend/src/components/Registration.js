import React from 'react';
import '../css/Registration.css';
import loginLogo from '../assets/registrationForm/login.svg';
import mailLogo from '../assets/registrationForm/mail.svg';
import telegramLogo from '../assets/registrationForm/telegram.svg';
import passwordLogo from '../assets/registrationForm/password.svg';

const InputField = ({ label, type, placeholder, logo }) => (
    <div>
        <label>{label}</label>
        <div className="input-container">
            <img src={logo} alt="logo" />
            <div className="divider"></div>
            <input type={type} placeholder={placeholder} />
        </div>
    </div>
);

const RegistrationForm = () => (
    <div className="registration-form">
        <h2>Добро пожаловать в ToUP</h2>
        <form>
            <InputField label="Имя" type="text" placeholder="Напишите свое имя" logo={loginLogo} />
            <div className="email-channel-container">
                <InputField label="Канал" type="text" placeholder="Ссылка на канал" logo={telegramLogo} />
                <InputField label="Email" type="email" placeholder="Ваша почта" logo={mailLogo} />
            </div>
            <InputField label="Пароль" type="password" placeholder="Придумайте пароль" logo={passwordLogo} />
            <InputField label="Повторите пароль" type="password" placeholder="Повторите пароль" logo={passwordLogo} />
            <button type="submit">Создать аккаунт</button>
        </form>
        <p>Уже есть аккаунт? <a href="#">Войти</a></p>
    </div>
);

const InfoBlock = () => (
    <div className="blue-rectangle">
        <p>Увеличьте свою аудиторию с нами</p>
        <div className="info-block registration">Регистрация</div>
        <div className="info-block subscribers">Выбор кол-ва подписчиков</div>
        <div className="info-block recharge">Пополнить счет</div>
        <div className="info-block task">Добавить задачу</div>
    </div>
);

const Registration = ({ onClose }) => {
    return (
        <div className="registration-window-overlay" onClick={onClose}>
            <div className="registration-window" onClick={(e) => e.stopPropagation()}>
                <div className="registration-content">
                    <RegistrationForm />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Registration;
