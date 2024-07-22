import React, { useState } from 'react';
import InputField from '../shared/InputField';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function Subscribers({ setIsTaskSettingOpen }) {
  const [error, setError] = useState(null);
  const [spreadValue, setSpreadValue] = useState('');
  const [subscriberCount, setSubscriberCount] = useState('');
  const [channelLink, setChannelLink] = useState('');
  const [taskTime, setTaskTime] = useState('');

  return (
    <>
      <div className='task-form-data'>
        <div className='task-form-data-row'>
          <InputField
            label="Разброс кол-ва"
            type="text"
            placeholder="%"
            logo={images['percentage.svg']}
            value={spreadValue}
            onChange={(e) => setSpreadValue(e.target.value)}
          />
          <InputField
            label="Кол-во просмотров"
            type="text"
            placeholder="Кол-во просмотров"
            logo={images['users-alt.svg']}
            value={subscriberCount}
            onChange={(e) => setSubscriberCount(e.target.value)}
          />
        </div>
        <InputField
          label="Ссылка к каналу"
          type="text"
          placeholder="Укажите ссылку на канал"
          logo={images['link.svg']}
          value={channelLink}
          onChange={(e) => setChannelLink(e.target.value)}
        />
        <InputField
          label="Время на выполнение"
          type="text"
          placeholder="Время на задачу"
          logo={images['calendarClock.svg']}
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
      </div>
      <div className='task-form-btn-box'>
        <button type="submit" className='task-form-submit-button'>
          Запустить задачу
        </button>
        <div className='advanced-setting-btn'>
          <img src={images['settings.svg']} alt="logo" />
        </div>
      </div>
      {error && <p className="error">{error}</p>}
    </>
  );
}
