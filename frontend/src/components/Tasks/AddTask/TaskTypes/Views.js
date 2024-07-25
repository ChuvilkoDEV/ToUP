import React from 'react';
import InputField from '../../../shared/InputField';
import ImageUtils from '../../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function Views({ taskData, handleTaskDataChange }) {
  const handleChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  return (
    <>
      <div className='task-form-data'>
        <div className='task-form-data-row'>
          <InputField
            label="Разброс кол-ва"
            type="text"
            placeholder="%"
            logo={images['percentage.svg']}
            value={taskData.spreadValue || ''}
            onChange={(e) => handleChange('spreadValue', e.target.value)}
          />
          <InputField
            label="Кол-во просмотров"
            type="text"
            placeholder="Просмотры"
            logo={images['users-alt.svg']}
            value={taskData.count_actions || ''}
            onChange={(e) => handleChange('count_actions', e.target.value)}
          />
        </div>
        <InputField
          label="Ссылка к каналу"
          type="text"
          placeholder="Укажите ссылку на канал"
          logo={images['link.svg']}
          value={taskData.target_url || ''}
          onChange={(e) => handleChange('target_url', e.target.value)}
        />
        <InputField
          label="Время на выполнение"
          type="text"
          placeholder="Время на задачу"
          logo={images['calendarClock.svg']}
          value={taskData.task_time || ''}
          onChange={(e) => handleChange('task_time', e.target.value)}
        />
      </div>
    </>
  );
}
