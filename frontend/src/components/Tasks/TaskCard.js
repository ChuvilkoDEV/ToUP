import React, { useState } from 'react';
import './TaskCard.css';
import { Tooltip } from 'react-tooltip';
import { HandySvg } from 'handy-svg';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const TaskCard = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [taskTime, setTaskTime] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('В прогрессе');
  const [date, setDate] = useState('');

  const handleEditToggle = () => {
    setIsEditOpen(!isEditOpen);
  };

  const getTaskTime = (time) => {
    const msPerMinute = 60;
    const msPerHour = 60 * msPerMinute;
    const msPerDay = 24 * msPerHour;
    const msPerWeek = 7 * msPerDay;

    const weeks = Math.floor(time / msPerWeek);
    const days = Math.floor((time % msPerWeek) / msPerDay);
    const hours = Math.floor((time % msPerDay) / msPerHour);
    const minutes = Math.floor((time % msPerHour) / msPerMinute);

    if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? 'неделя' : 'недели'}`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? 'день' : 'дня'}`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'час' : 'часов'}`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'минута' : 'минут'}`;
    } else {
      return "менее минуты";
    }
  };

  const getDate = () => {
    const date = new Date(task.date_add * 1000);
    const months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month}, ${year}`;
  };

  React.useEffect(() => {
    setProgress(Math.floor(task.complite_actions / task.count_actions * 100));
    setStatus(progress === 100 ? 'Завершено' : 'В прогрессе');
    setDate(getDate());
    setTaskTime(getTaskTime(task.task_time));
  });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const typeLabel = {
    'subs': 'Подписчиков',
    'react': 'Реакций',
    'views': 'Просмотров',
  };

  const EditMenu = () => (
    <div className='task-card-edit-menu'>
      <div className='task-card-edit-menu-item'>
        <span className='mr-5'>Остановить</span>
        <HandySvg src={images[`stopTask.svg`]} className='logo-15x15' />
      </div>
      <div className='task-card-edit-menu-item'>
        <span className='mr-5'>Изменить</span>
        <HandySvg src={images[`changeTask.svg`]} className='logo-15x15' />
      </div>
    </div>
  );

  const CardHeader = () => (
    <div className="task-card-header">
      <div className='upper'>
        <HandySvg src={images[`menuDots.svg`]} className='logo-15x15 edit-menu-btn' onClick={handleEditToggle} />
        {isEditOpen && <EditMenu />}
        <div className="task-due-date">
          <img src={images[`calendarClock.svg`]} alt="logo" />
          {taskTime}
        </div>
      </div>
      <div className="task-title">
        <div className='task-type-logo'>
          <HandySvg src={images[`${task.task_type}.svg`]} className="logo-20x20 currentColor" />
        </div>
        {task.count_actions}<br />
        {typeLabel[task.task_type]}
      </div>
    </div>
  );

  const StatusProgress = () => (
    <div className="status-progress-row">
      <div className="task-status">
        {status}
      </div>
      <div className="progress-info">
        {progress}%
        {progress === 100 ?
          <img src={images['success.svg']} alt="logo" />
          :
          <>
            <a
              data-tooltip-id={`info-tooltip-${task.id}`}
              data-tooltip-class-name={`info-tooltip`}
              data-tooltip-place="top-end"
            >
              <HandySvg src={images[`info.svg`]} className="logo-15x15" />
            </a>
            <Tooltip id={`info-tooltip-${task.id}`} className='task-card-remain-time'>
              На выполнение осталось {getTaskTime((task.date_add + task.task_time) - parseInt(Date.now() / 1000))}
            </Tooltip>
          </>
        }
      </div>
    </div>
  );

  const ProgressBar = () => (
    <div className="task-progress">
      <div className="progress-bar">
        <div
          className={`progress ${progress === 100 ? 'success' : ''}`}
          style={{ width: `${progress}%` }}>
        </div>
      </div>
    </div>
  );

  const TaskStatistic = () => (
    <div className="task-statistics">
      {task.complite_actions} из {task.count_actions}
    </div>
  );

  const CardBody = () => (
    <div className="task-card-body">
      <StatusProgress />
      <ProgressBar />
      <TaskStatistic />
    </div>
  );

  const ExpandedStaistic = () => (
    <div className="task-card-footer">
      <button className="details-button" onClick={handleToggle}>Свернуть</button>
      <div className="additional-statistics">
        <hr className="divider" />
        <div className='additional-statistics title'>
          Волна:
          <div className="highlight-text"> {0}%</div>
        </div>
        <div className='additional-statistics title'>
          Процент разброса:
          <div className="highlight-text"> {0}%</div>
        </div>
        <div className='additional-statistics title'>
          Группа:
          <div className="highlight-text"> {0}</div>
        </div>
        <div className='additional-statistics title'>
          <div className='calendar'>
            <img src={images['calendar.svg']} alt="logo" className='mr-5' />
            {date}
          </div>
        </div>
      </div>
    </div>
  );

  const ClosedStaistic = () => (
    <div className="task-card-footer">
      <button className="details-button" onClick={handleToggle}>Подробнее</button>
    </div>
  );

  const CardFooter = () => {
    return isExpanded ?
      <ExpandedStaistic /> :
      <ClosedStaistic />;
  };

  return (
    <div className={`task-card ${isExpanded ? 'expanded' : ''}`}>
      <CardHeader />
      <CardBody />
      <CardFooter />
    </div >
  );
}

export default TaskCard;
