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
    bot_group: '', // Опционально только для админов
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

  const handleBehaviour = () => {
    let overflow = 0;
    const countBotsPerInterval = (sumPercentage, index) => {
      // debugger;
      let botsToInterval = parseInt(taskData.count_actions, 10) * (taskData.behavior[index] / sumPercentage);
      // console.log(botsToInterval)
      overflow += botsToInterval % 1;
      botsToInterval = Math.floor(botsToInterval)
      if (overflow >= 1) {
        botsToInterval += 1;
        overflow -= 1;
      } 
      return botsToInterval;
    }

    const timeToInterval = Math.round(taskData.task_time / taskData.countIntervals);
    const sumPercentage = taskData.behavior.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const now = Date.now(); 
    const ans = [[now, countBotsPerInterval(sumPercentage, 0)]];
    for (let i = 1; i < taskData.countIntervals; i++) {
      ans.push([ans[i - 1][0] + timeToInterval * 1000, countBotsPerInterval(sumPercentage, i)]); // Увеличиваем временную метку на интервал
    }
    ans[ans.length - 1][1] += taskData.count_actions % taskData.countIntervals; // Исправление ошибки: индекс последнего элемента массива
    return ans;
  };
  

  const sendTasksToServer = async () => {
    try {
      // Формирование данных в требуемом формате
      const formattedData = {
        token: localStorage.getItem('token'),
        data: [
          {
            task_type: taskData.task_type,
            target_url: taskData.target_url,
            count_actions: taskData.count_actions,
            task_obj: taskData.task_obj,
            task_time: taskData.task_time,
            behavior: handleBehaviour(),
          },
        ],
      };

      await axios.post('http://147.45.111.226:8001/api/addtask', formattedData);
      // setTaskData({
      //   task_type: 'subs',
      //   target_url: '',
      //   count_actions: 0,
      //   task_obj: [],
      //   task_time: 1,
      //   time: 1,
      //   timeUnit: 'days',
      //   countIntervals: 24,
      //   behavior: Array.from({ length: 24 }, () => 50), // Сброс начального состояния
      //   bot_group: '', // Сброс bot_group
      // });
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
