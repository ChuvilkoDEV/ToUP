import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './Tasks.css';
import tasksData from './tasksData';
import ImageUtils from '../imageUtils';
import TaskWindow from './TaskWindow'; // Import the TaskWindow component

const images = ImageUtils.importAllImages(require.context('../../assets/tasks', false, /\.(svg)$/));

const Tasks = () => {
  const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false);

  const handleOpenTaskWindow = () => {
    setIsTaskWindowOpen(true);
  };

  const handleCloseTaskWindow = () => {
    setIsTaskWindowOpen(false);
  };

  return (
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
  );
}

export default Tasks;
