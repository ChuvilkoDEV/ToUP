import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlueRectangle from './BlueRectangle';
import TaskForm from './TaskForm';
import './TaskWindow.css';
import TaskSettings from './AdvancedSettings/TaskSettings';

const TaskWindow = ({ onClose }) => {
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    task_type: 'subs',
    target_url: '',
    count_actions: 0,
    task_obj: [],
    task_time: 1,
    time: 1,
    timeUnit: 'days',
    countIntervals: 24,
    behavior: Array.from({ length: 24 }, () => 50), // Начальная инициализация
  });

  const handleTaskDataChange = (newData) => {
    setTaskData((prevState) => ({
      ...prevState,
      ...newData,
    }));
  };

  const handleTaskSettingMenu = () => {
    setIsTaskSettingOpen(!isTaskSettingOpen);
  };

  const sendTasksToServer = async () => {
    try {
      await axios.post('http://147.45.111.226:8001/api/addtask', { task: taskData });
      setTaskData({
        task_type: 'subs',
        target_url: '',
        count_actions: 0,
        task_obj: [],
        task_time: 1,
        time: 1,
        timeUnit: 'days',
        countIntervals: 24,
        behavior: Array.from({ length: 24 }, () => 50), // Сброс начального состояния
      });
    } catch (error) {
      console.error('Ошибка при отправке задач:', error);
      alert('Ошибка при отправке задач');
    }
  };

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!e.target.closest('.task-window')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  useEffect(() => {
    setTaskData((prevTaskData) => ({
      ...prevTaskData,
      behavior: Array.from({ length: prevTaskData.countIntervals }, () => 50),
    }));
  }, [taskData.countIntervals]);


  return (
    <div className="task-window-overlay">
      <div className="task-window">
        <div className="task-content">
          {isTaskSettingOpen ? (
            <TaskSettings
              taskData={taskData}
              handleTaskDataChange={handleTaskDataChange}
              handleTaskSettingMenu={handleTaskSettingMenu}
            />
          ) : (
            <>
              <TaskForm
                handleTaskSettingMenu={handleTaskSettingMenu}
                taskData={taskData}
                handleTaskDataChange={handleTaskDataChange}
                sendTasksToServer={sendTasksToServer}
              />
              <BlueRectangle />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskWindow;
