import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BlueRectangle from './BlueRectangle'
import TaskForm from './TaskForm';
import './TaskWindow.css';
import TaskSettings from './AdvancedSettings/TaskSettings'


const TaskWindow = ({ onClose }) => {
  const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    task_type: 'subs',
    target_url: '',
    count_actions: 0,
    task_obj: [],
    task_time: 1,
    behavior: [],
  });

  const handleTaskDataChange = (newData) => {
    setTaskData({ ...taskData, ...newData });
  };

  const handleTaskSettingMenu = () => {
    setIsTaskSettingOpen(!isTaskSettingOpen);
  };

  const sendTasksToServer = async () => {
    try {
      await axios.post('http://147.45.111.226:8001/api/addtask', { task: taskData });
      alert('Задачи успешно отправлены на сервер');
      setTaskData({
        task_type: 'subs',
        target_url: '',
        count_actions: 0,
        task_obj: [],
        task_time: 1,
        behavior: [],
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

  return (
    <div className="task-window-overlay">
      <div className="task-window">
        <div className="task-content">
          {isTaskSettingOpen ?
            <TaskSettings
              handleTaskSettingMenu={handleTaskSettingMenu}
              taskData={taskData}
              handleTaskDataChange={handleTaskDataChange}
            /> : <>
              <TaskForm
                handleTaskSettingMenu={handleTaskSettingMenu}
                taskData={taskData}
                handleTaskDataChange={handleTaskDataChange}
                sendTasksToServer={sendTasksToServer}
              />
              <BlueRectangle />
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default TaskWindow;
