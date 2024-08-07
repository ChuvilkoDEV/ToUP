import React from 'react';
import InputField from '../../../shared/InputField';
import './TaskSettings.css';
import ImageUtils from '../../../imageUtils';
import ChartComponent from './ChartComponent';

import { HandySvg } from 'handy-svg';
import TimeField from '../TimeField';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const TaskSettings = ({ taskData, handleTaskDataChange, handleTaskSettingMenu }) => {
  const handleChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  const handleIntervalChange = (e) => {
    handleChange('countIntervals', parseInt(e.target.value, 10));
  };

  const HeaderTitle = () => {
    return (
      <>
        <div className='task-setting-back-btn' onClick={handleTaskSettingMenu}>
          <HandySvg src={images['back.svg']} className={`logo-15x15`} />
        </div>
        <div className="task-settings-header">
          <h3>Продвинутые настройки задачи</h3>
        </div>
      </>
    )
  };

  const InputFields = () => {
    return (
      <div className="task-settings-fields">
        <TimeField taskData={taskData} handleTaskDataChange={handleTaskDataChange} />
        <InputField
          label="Интервал" type="number" placeholder="Введите количество интервалов"
          logo={images['todo.svg']} error={taskData.errors.interval}
          value={taskData.countIntervals} handleChange={handleIntervalChange}
          options={{ minValue: 0, maxValue: 24, }}
        />
      </div>
    )
  };

  return (
    <div className="task-settings">
      {HeaderTitle()}
      {InputFields()}
      <div className='chart-content'>
        <ChartComponent taskData={taskData} handleTaskDataChange={handleTaskDataChange} />
      </div>
      <div className="task-settings-footer">
        <button className="reset-button">Сбросить настройки</button>
        <button className="save-button">Сохранить изменения</button>
      </div>
    </div>
  );
};

export default TaskSettings;