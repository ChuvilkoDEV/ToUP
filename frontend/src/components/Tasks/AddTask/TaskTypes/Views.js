import React from 'react';
import InputField from '../../../shared/InputField';
import ImageUtils from '../../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function Views({ taskData, handleTaskDataChange }) {
  const handleDataChange = (field, value) => {
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
            handleChange={(e) => handleDataChange('spreadValue', e.target.value)}
          />
          <InputField
            label="Кол-во просмотров"
            type="text"
            placeholder="Просмотры"
            logo={images['users-alt.svg']}
            value={taskData.count_actions || ''}
            handleChange={(e) => handleDataChange('count_actions', e.target.value)}
          />
        </div>
        <InputField
          label="Ссылка на пост"
          type="text"
          placeholder="Укажите ссылку на пост"
          logo={images['link.svg']}
          value={taskData.target_url || ''}
          handleChange={(e) => handleDataChange('target_url', e.target.value)}
        />
      </div>
    </>
  );
}
