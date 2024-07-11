// Tasks.jsx
import React from 'react';
import TaskCard from './TaskCard';
import './Tasks.css'; // импорт стилей
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/tasks', false, /\.(svg)$/));

const tasksData = [
  {
    id: 1,
    title: '10 000 подписчиков',
    status: 'В прогрессе',
    progress: 67,
    completed: 6700,
    total: 10000,
    dueDate: '5 дней',
    type: 'subscribers',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 2,
    title: '10 000 подписчиков',
    status: 'В прогрессе',
    progress: 67,
    completed: 6700,
    total: 10000,
    dueDate: '5 дней',
    type: 'subscribers',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 3,
    title: '9 000 реакций',
    status: 'В прогрессе',
    progress: 76,
    completed: 6840,
    total: 9000,
    dueDate: '5 дней',
    type: 'reactions',
    wave: 80,
    percent: 42,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 4,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 5,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 6,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 7,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 8,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 9,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 10,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 11,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 12,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 13,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  },
  {
    id: 14,
    title: '20 000 просмотров',
    status: 'Завершен',
    progress: 100,
    completed: 20000,
    total: 20000,
    dueDate: '2 дня',
    type: 'views',
    wave: 70,
    percent: 33,
    group: 'Group1',
    date: '2 июля, 2024',
  }
];

const Tasks = () => {
  return (
    <div className="tasks">
      <div className='tasks-title'>
        <h1>Все задачи</h1>
        <div className='tasks-buttons'>
          <button className='px-5'>Сортировать</button>
          <button>
            <img src={images['add.svg']} alt="logo" />
          </button>
        </div>
      </div>
      <div className="tasks-grid">
        {tasksData.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
