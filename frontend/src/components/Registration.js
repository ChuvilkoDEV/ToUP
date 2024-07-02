import React, { useEffect } from 'react';
import '../css/Registration.css';
import loginLogo from '../assets/registrationForm/login.svg';
import mailLogo from '../assets/registrationForm/mail.svg';
import telegramLogo from '../assets/registrationForm/telegram.svg';
import passwordLogo from '../assets/registrationForm/password.svg';
import arrow1 from '../assets/registrationForm/arrow1.svg';
import arrow2 from '../assets/registrationForm/arrow2.svg';
import arrow3 from '../assets/registrationForm/arrow3.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <p className='text-blue-left'>Создайте аккаунт</p>
        <h2>ДОБРО ПОЖАЛОВАТЬ в ToUP</h2>
        <form>
            <InputField label="Email" type="email" placeholder="Ваша почта" logo={mailLogo} />
            <div className="email-channel-container">
                <InputField label="Канал" type="text" placeholder="Ссылка на канал" logo={telegramLogo} />
                <InputField label="Имя" type="text" placeholder="Напишите имя" logo={loginLogo} />
            </div>
            <InputField label="Пароль" type="password" placeholder="Придумайте пароль" logo={passwordLogo} />
            <InputField label="Повторите пароль" type="password" placeholder="Повторите пароль" logo={passwordLogo} />
            <button type="submit">Создать аккаунт</button>
        </form>
        <p>Уже есть аккаунт? <a href="#">Войти</a></p>
    </div>
);

const InfoBlock = () => (
    <div className="blue-rectangle p-3">
        <p className="overlay-text mb-4">Увеличьте свою аудиторию с нами</p>
        <div className="container">
            <div className="info-block-container">
                <div className="right-block align-self-end">
                    <div className="info-content">
                        <img src={arrow1} alt="logo" className="arrow1-icon" />
                        <div className="info-block">Регистрация</div>
                    </div>
                </div>
                <div className="left-block align-self-start">
                    <div className="info-content">
                        <div className="info-block">Выбор кол-ва подписчиков</div>
                        <img src={arrow2} alt="logo" className="arrow2-icon" />
                    </div>
                </div>
                <div className="right-block align-self-end">
                    <div className="info-content">
                        <img src={arrow3} alt="logo" className="arrow3-icon" />
                        <div className="info-block">Пополнить счет</div>
                    </div>
                </div>
                <div className="left-block align-self-start">
                    <div className="info-content">
                        <div className="info-block mb-0">Добавить задачу</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Registration = ({ onClose }) => {
    useEffect(() => {
        const handleMouseDown = (e) => {
            if (!e.target.closest('.registration-window')) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [onClose]);

    return (
        <div className="registration-window-overlay">
            <div className="registration-window">
                <div className="registration-content">
                    <RegistrationForm />
                    <InfoBlock />
                </div>
            </div>
        </div>
    );
};

export default Registration;
