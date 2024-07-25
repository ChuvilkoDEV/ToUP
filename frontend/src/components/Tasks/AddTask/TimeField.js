import React, { useEffect } from 'react';
import InputField from '../../shared/InputField';
import ImageUtils from '../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function TimeField({ taskData, handleTaskDataChange }) {
  const handleChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  useEffect(() => {
    const timeUnit = {
      'hours': 60 * 60,
      'days': 24 * 60 * 60,
      'weeks': 7 * 24 * 60 * 60,
    };
    handleChange('task_time', taskData.time * timeUnit[taskData.timeUnit]);
  }, [taskData.time, taskData.timeUnit]); // Обновляем task_time при изменении time или timeUnit

  const handleTimeChange = (e) => {
    handleChange('time', e.target.value);
  };

  const handleTimeUnitChange = (e) => {
    handleChange('timeUnit', e.target.value);
  };

  return (
    <InputField
      label="Время на выполнение"
      type="select-input"
      placeholder="Выберите..."
      logo={images['todo.svg']}
      value={taskData.time}
      onChange={handleTimeChange}
      includeField={{
        value: taskData.timeUnit,
        onChange: handleTimeUnitChange,
      }}
      options={[
        { label: 'Часы', value: 'hours' },
        { label: 'Дни', value: 'days' },
        { label: 'Недели', value: 'weeks' },
      ]}
    />
  );
}
