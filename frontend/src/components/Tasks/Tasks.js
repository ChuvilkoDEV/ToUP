// Tasks.jsx
import React from 'react';
import TaskCard from './TaskCard';
import './Tasks.css'; // импорт стилей

const tasksData = [
    {
      id: 1,
      title: '10 000 подписчиков',
      status: 'В прогрессе',
      progress: 67,
      completed: 6700,
      total: 10000,
      dueDate: '5 дней',
    },
    {
      id: 2,
      title: '9 000 реакций',
      status: 'В прогрессе',
      progress: 76,
      completed: 6840,
      total: 9000,
      dueDate: '1 неделя',
    },
    {
      id: 1,
      title: '10 000 подписчиков',
      status: 'В прогрессе',
      progress: 67,
      completed: 6700,
      total: 10000,
      dueDate: '5 дней',
    },
    {
      id: 2,
      title: '9 000 реакций',
      status: 'В прогрессе',
      progress: 76,
      completed: 6840,
      total: 9000,
      dueDate: '1 неделя',
    },
    {
      id: 1,
      title: '10 000 подписчиков',
      status: 'В прогрессе',
      progress: 67,
      completed: 6700,
      total: 10000,
      dueDate: '5 дней',
    },
    {
      id: 2,
      title: '9 000 реакций',
      status: 'В прогрессе',
      progress: 76,
      completed: 6840,
      total: 9000,
      dueDate: '1 неделя',
    },
    {
      id: 1,
      title: '10 000 подписчиков',
      status: 'В прогрессе',
      progress: 67,
      completed: 6700,
      total: 10000,
      dueDate: '5 дней',
    },
    {
      id: 2,
      title: '9 000 реакций',
      status: 'В прогрессе',
      progress: 76,
      completed: 6840,
      total: 9000,
      dueDate: '1 неделя',
    },
    {
      id: 1,
      title: '10 000 подписчиков',
      status: 'В прогрессе',
      progress: 67,
      completed: 6700,
      total: 10000,
      dueDate: '5 дней',
    },
    {
      id: 2,
      title: '9 000 реакций',
      status: 'В прогрессе',
      progress: 76,
      completed: 6840,
      total: 9000,
      dueDate: '1 неделя',
    },
  // добавьте другие задачи сюда
];

const Tasks = () => {
  return (
    <div className="tasks">
      <h1>Все задачи</h1>
      <div className="tasks-grid">
        {tasksData.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Tasks;
