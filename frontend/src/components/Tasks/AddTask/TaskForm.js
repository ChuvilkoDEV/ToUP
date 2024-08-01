import React, { useState } from 'react';
import InputField from '../../shared/InputField';
import Subscribers from './TaskTypes/Subscribers';
import Reactions from './TaskTypes/Reactions';
import Views from './TaskTypes/Views';
import TimeField from './TimeField';
import './TaskForm.css';
import { HandySvg } from 'handy-svg';

import ImageUtils from '../../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const TaskForm = ({ handleTaskSettingMenu, taskData, handleTaskDataChange, sendTasksToServer }) => {
  const [isAutoTask, setIsAutoTask] = useState(false);
  const [error, setError] = useState(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const botInfoBlock = [
    { emoji: 'subscribers', text: '1 подписчик' },
    { emoji: 'views', text: '1 просмотр' },
    { emoji: 'reactions', text: '1 реакция' },
  ]

  const handleTaskTypeClick = (type) => {
    setIsAutoTask(type === 'auto');
  };

  const handleSelectChange = (e) => {
    handleTaskDataChange({ task_type: e.target.value });
  };

  const handleChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  const TaskCreationSection = () => (
    <>
      <h2>Создайте задачу за пару кликов</h2>
      <div className='type-task-buttons-container'>
        <button
          className={`type-task-button ${!isAutoTask ? 'active' : ''}`}
          onClick={() => handleTaskTypeClick('task')}
        >
          Задача
        </button>
        <button
          className={`type-task-button ${isAutoTask ? 'active' : ''}`}
          onClick={() => handleTaskTypeClick('auto')}
        >
          Авто задача
        </button>
      </div>
      <div className='task-form-count-bots'>
        <div className='left-side-bots'>
          <p className='mb-0'>У вас имеется</p>
          <div className="bot-info-container">
            <HandySvg src={images['user-robot.svg']} className="bot-icon" />
            <p className="bot-count">4000 ботов</p>
          </div>
        </div>
        <div
          className='right-side-bots'
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          <HandySvg src={images['info.svg']} className="logo-15x15" />
          {isTooltipVisible && (
            <div className='tooltip-bots-info'>
              {botInfoBlock.map((item, index) => (
                <div key={index} className="tooltip-item">
                  <HandySvg src={images[`${item.emoji}.svg`]} className="logo-15x15 mr-5" />
                  <span>{`1 бот = ${item.text}`}</span>
                </div>
              ))}
              <a href="#" className="tooltip-link">Приобрести</a>
            </div>
          )}
        </div>
      </div>
      <InputField
        label="Действия"
        type="select"
        placeholder="Выберите..."
        logo={images['todo.svg']}
        value={taskData.task_type}
        handleChange={handleSelectChange}
        options={{
          options: [
            { label: 'Подписки', value: 'subs' },
            { label: 'Реакции', value: 'react' },
            { label: 'Просмотры', value: 'views' },
          ]
        }}
      />
    </>
  );

  return (
    <div className="task-form">
      <TaskCreationSection />
      {taskData.task_type === 'subs' ?
        <Subscribers taskData={taskData} handleTaskDataChange={handleTaskDataChange} />
        : taskData.task_type === 'react' ?
          <Reactions taskData={taskData} handleTaskDataChange={handleTaskDataChange} />
          :
          <Views taskData={taskData} handleTaskDataChange={handleTaskDataChange} />
      }
      <TimeField taskData={taskData} handleTaskDataChange={handleTaskDataChange} />
      <div className='task-form-btn-box'>
        <button type="submit" className='task-form-submit-button' onClick={sendTasksToServer}>
          Запустить задачу
        </button>
        {taskData.task_type !== 'subs' &&
          <div className='advanced-setting-btn' onClick={handleTaskSettingMenu}>
            <HandySvg src={images[`settings.svg`]} className="logo-15x15" />
          </div>}
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default TaskForm;
