import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-divider"></div>
      <div className="footer-links">
        <div className="footer-column">
            <h4>Сэкономьте с нами свое время и деньги!</h4>
            <button className="footer-button">Написать нам</button>
        </div>
        <div className="footer-column">
          <h4>Навигация</h4>
          <ul>
            <li>Личный кабинет</li>
            <li>История задач</li>
            <li>Часто задаваемые вопросы</li>
            <li>Бонусы</li>
            <li>Поддержка</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Соц. Сети</h4>
          <ul>
            <li>Telegram</li>
            <li>Instagram</li>
            <li>Discord</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Контакты</h4>
          <p>+7 (911) 000 00 00 с 9:00 до 18:00 пн-пт</p>
          <p>admin@toup.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
