import React, { useEffect } from 'react';
import InputField from '../../shared/InputField';
import ImageUtils from '../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

export default function TimeField({ taskData, handleTaskDataChange }) {
  const handleChange = (field, value) => {
    handleTaskDataChange({ [field]: value });
  };

  const timeUnit = {
    'hours': 60 * 60,
    'days': 24 * 60 * 60,
    'weeks': 7 * 24 * 60 * 60,
  };

  useEffect(() => {
    const newTaskTime = taskData.time * timeUnit[taskData.timeUnit];
    if (taskData.task_time !== newTaskTime) {
      handleChange('task_time', newTaskTime);
    }
  }, [taskData.time, taskData.timeUnit]);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (value * timeUnit[taskData.timeUnit] <= 180 * timeUnit['days']) {
      handleChange('time', value);
    }
  };

  const handleTimeUnitChange = (e) => {
    handleChange('timeUnit', e.target.value);
  };

  return (
    <InputField
      label="Время на выполнение" type="number-select-input" placeholder="Выберите..."
      logo={images['todo.svg']}  error={taskData.errors.count_actions}
      value={taskData.time} handleChange={handleTimeChange}
      options={{
        includeField: {
          value: taskData.timeUnit,
          handleChange: handleTimeUnitChange,
        },
        options: [
          { label: 'Часы', value: 'hours' },
          { label: 'Дни', value: 'days' },
          { label: 'Недели', value: 'weeks' },
        ],
      }}
    />
  );
}
