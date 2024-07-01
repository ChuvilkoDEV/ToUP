import React from 'react';
import '../css/Registration.css';
import logo from '../assets/registrationForm/mail.svg'; // Убедитесь, что путь к логотипу верный

const Registration = ({ onClose }) => {
    return (
        <div className="registration-window-overlay" onClick={onClose}>
            <div className="registration-window" onClick={(e) => e.stopPropagation()}>
                <div className="registration-content">
                    <div className="registration-form">
                        <h2>Добро пожаловать в ToUP</h2>
                        <form>
                            <div>
                                <label>Имя</label>
                                <div className="input-container">
                                    <img src={logo} alt="logo" />
                                    <div className="divider"></div>
                                    <input type="text" placeholder="Напишите свое имя" />
                                </div>
                            </div>
                            <div>
                                <label>Канал</label>
                                <div className="input-container">
                                    <img src={logo} alt="logo" />
                                    <div className="divider"></div>
                                    <input type="text" placeholder="Ссылка на канал" />
                                </div>
                            </div>
                            <div>
                                <label>Email</label>
                                <div className="input-container">
                                    <img src={logo} alt="logo" />
                                    <div className="divider"></div>
                                    <input type="email" placeholder="Ваша почта" />
                                </div>
                            </div>
                            <div>
                                <label>Пароль</label>
                                <div className="input-container">
                                    <img src={logo} alt="logo" />
                                    <div className="divider"></div>
                                    <input type="password" placeholder="Придумайте пароль" />
                                </div>
                            </div>
                            <div>
                                <label>Повторите пароль</label>
                                <div className="input-container">
                                    <img src={logo} alt="logo" />
                                    <div className="divider"></div>
                                    <input type="password" placeholder="Повторите пароль" />
                                </div>
                            </div>
                            <button type="submit">Создать аккаунт</button>
                        </form>
                        <p>Уже есть аккаунт? <a href="#">Войти</a></p>
                    </div>
                    <div className="blue-rectangle">
                        <p>Увеличьте свою аудиторию с нами</p>
                        <ul>
                            <li>Регистрация</li>
                            <li>Выбор кол-ва подписчиков</li>
                            <li>Пополнить счет</li>
                            <li>Добавить задачу</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
