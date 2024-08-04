import React, { useState } from 'react';
import './Notification.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function Notification() {
  const [isPublicType, setIsPublicType] = useState(true);
  const [publicNotifications, setPublicNotifications] = useState([
    { type: 'update', label: 'Мы выпустили новое обновление', date: 'Сегодня' },
    { type: 'update', label: 'Мы выпустили новое обновление', date: 'Сегодня' },
    { type: 'update', label: 'Мы выпустили новое обновление', date: 'Сегодня' },
  ]);
  const [privateNotifications, setPrivateNotifications] = useState([
    { type: 'support', label: 'Ваш тикет создан', date: 'Сегодня' },
    { type: 'task', label: 'Ваша задача запущена', date: 'Вчера' },
  ]);

  const handleTypeToggle = () => (
    setIsPublicType(!isPublicType)
  );

  const NotificationItem = ({ notification }) => (
    <div className='notification-container'>
      <div className='notification-icon'>
        <img src={images[`${notification.type}.svg`]} alt={`${notification.type}`} />
      </div>
      <div className='notification-text'>
        <div className='notification-label'>
          {notification.label}
        </div>
        <span className='notification-info'>Версия 1.1 - {notification.date}</span>
      </div>
    </div>
  );

  const NotificationContainer = () => (
    <div className='notification-list-container'>
      {currentNotifications.map((notification) => (
        <NotificationItem key={notification.label} notification={notification} />
      ))}
    </div>
  );

  const currentNotifications = isPublicType ? publicNotifications : privateNotifications;

  return (
    <div className="notification-dropdown-menu">
      <div className='notification-title'>
        Уведомления
      </div>
      <div className='notification-type-container'>
        <div className={`notification-type ${isPublicType ? 'active' : ''}`} onClick={handleTypeToggle}>
          Общие
        </div>
        <div className={`notification-type ${!isPublicType ? 'active' : ''}`} onClick={handleTypeToggle}>
          Личные
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
}
