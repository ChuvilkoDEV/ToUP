import React from 'react';
import '../css/Registration.css';

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
                                <input type="text" placeholder="Напишите свое имя" className="input-with-logo" />
                            </div>
                            <div>
                                <label>Канал</label>
                                <input type="text" placeholder="Ссылка на канал" className="input-with-logo" />
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="email" placeholder="Ваша почта" className="input-with-logo" />
                            </div>
                            <div>
                                <label>Пароль</label>
                                <input type="password" placeholder="Придумайте пароль" className="input-with-logo" />
                            </div>
                            <div>
                                <label>Повторите пароль</label>
                                <input type="password" placeholder="Повторите пароль" className="input-with-logo" />
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
