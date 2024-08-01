import React from 'react';
import InputField from '../../../shared/InputField';
import ImageUtils from '../../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function Subscribers({ taskData, handleTaskDataChange }) {
  const handleDataChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  return (
    <>
      <div className='task-form-data'>
        <div className='task-form-data-row'>
          <InputField
            label="Разброс кол-ва" type="number" placeholder="%"
            logo={images['percentage.svg']} error={taskData.errors.spread}
            value={taskData.spreadValue || ''}
            handleChange={(e) => handleDataChange('spreadValue', e.target.value)}
            options={{minValue: 0, maxValue: 100}}
          />
          <InputField
            label="Кол-во подписчиков" type="number" placeholder="Подписчики"
            logo={images['users-alt.svg']} error={taskData.errors.count_actions}
            value={taskData.count_actions || ''}
            handleChange={(e) => handleDataChange('count_actions', e.target.value)}
            options={{minValue: 0, maxValue: 4000}}
          />
        </div>
        <InputField
          label="Ссылка на канал" type="text" placeholder="Укажите ссылку на канал"
          logo={images['link.svg']} error={taskData.errors.link}
          value={taskData.target_url || ''}
          handleChange={(e) => handleDataChange('target_url', e.target.value)}
        />
      </div>
    </>
  );
}
