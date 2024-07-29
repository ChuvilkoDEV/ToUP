import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import TaskCard from './TaskCard';
import TaskWindow from './AddTask/TaskWindow';
import './Tasks.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const Tasks = () => {
  const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.post('http://147.45.111.226:8001/api/gettask', {
          token: token,
          offset: 0,
          limit: 10,
        });

        setTasks(response.data.data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleOpenTaskWindow = () => {
    setIsTaskWindowOpen(true);
  };

  const handleCloseTaskWindow = () => {
    setIsTaskWindowOpen(false);
  };

  const TasksTitle = () => (
    <div className='tasks-title'>
      <h1>Все задачи</h1>
      <div className='tasks-buttons'>
        <button className='px-5'>Сортировать</button>
        <button onClick={handleOpenTaskWindow}>
          <img src={images['add.svg']} alt="Добавить задачу" />
        </button>
      </div>
    </div>
  );

  const TasksCards = () => (
    <div className="tasks-grid">
      {/* {tasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))} */}
    </div>
  );

  return (
    <>
      <Header />
      <div className="tasks">
        <TasksTitle />
        <TasksCards />
        {isTaskWindowOpen && <TaskWindow onClose={handleCloseTaskWindow} />}
      </div>
      <Footer />
    </>
  );
}

export default Tasks;
