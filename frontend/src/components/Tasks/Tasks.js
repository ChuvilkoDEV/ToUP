import React, { useState } from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import TaskCard from './TaskCard';
import tasksData from './tasksData';
import TaskWindow from './TaskWindow'; 
import './Tasks.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const Tasks = () => {
  const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false);

  const handleOpenTaskWindow = () => {
    setIsTaskWindowOpen(true);
  };

  const handleCloseTaskWindow = () => {
    setIsTaskWindowOpen(false);
  };

  return (
    <>
      <Header />
      <div className="tasks">
        <div className='tasks-title'>
          <h1>Все задачи</h1>
          <div className='tasks-buttons'>
            <button className='px-5'>Сортировать</button>
            <button onClick={handleOpenTaskWindow}>
              <img src={images['add.svg']} alt="Добавить задачу" />
            </button>
          </div>
        </div>
        <div className="tasks-grid">
          {tasksData().map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        {isTaskWindowOpen && <TaskWindow onClose={handleCloseTaskWindow} />}
      </div>
      <Footer />
    </>
  );
}

export default Tasks;
