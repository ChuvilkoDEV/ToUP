import React, { useState } from 'react';
import './TaskCard.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const TaskCard = ({ task }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const CardHeader = () => (
    <div className="task-card-header">
      <div className="task-due-date">
        <img src={images[`calendarClock.svg`]} alt="logo" />
        {task.dueDate}
      </div>
      <div className="task-title">
        <img src={images[`${task.type}.svg`]} alt="logo" />
        {task.total}<br />
        Просмотров
      </div>
    </div>
  );

  const StatusProgress = () => (
    <div className="status-progress-row">
      <div className="task-status">
        {task.status}
      </div>
      <div className="progress-info">
        {task.progress}%
        {task.progress === 100 ?
          <img src={images['success.svg']} alt="logo" />
          :
          <div
            className="tooltip-wrapper"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src={images['info.svg']} alt="logo" />
            {isTooltipVisible && <div className="custom-tooltip">На выполнение осталось 3 дня</div>}
          </div>
        }
      </div>
    </div>
  );

  const ProgressBar = () => (
    <div className="task-progress">
      <div className="progress-bar">
        <div
          className={`progress ${task.progress === 100 ? 'success' : ''}`}
          style={{ width: `${task.progress}%` }}>
        </div>
      </div>
    </div>
  );

  const TaskStatistic = () => (
    <div className="task-statistics">
      {task.completed} из {task.total}
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
          <div className="highlight-text"> {task.wave}%</div>
        </div>
        <div className='additional-statistics title'>
          Процент разброса:
          <div className="highlight-text"> {task.percent}%</div>
        </div>
        <div className='additional-statistics title'>
          Группа:
          <div className="highlight-text"> {task.group}</div>
        </div>
        <div className='additional-statistics title'>
          <div className='calendar'>
            <img src={images['calendar.svg']} alt="logo" className='mr-5' />
            {task.date}
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
      <ClosedStaistic />
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
