import React, { useState } from 'react';
import './TaskCard.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const typeLogo = {
    'subscribers': <img src={images['subscribers.svg']} alt="logo" className='mx-2' />,
    'reactions': <img src={images['reactions.svg']} alt="logo" className='mx-2' />,
    'views': <img src={images['views.svg']} alt="logo" className='mx-2' />,
};

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

    return (
        <div className={`task-card ${isExpanded ? 'expanded' : ''}`}>
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
            <div className="task-card-body">
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
                <div className="task-progress">
                    <div className="progress-bar">
                        <div
                            className={`progress ${task.progress === 100 ? 'success' : ''}`}
                            style={{ width: `${task.progress}%` }}>
                        </div>
                    </div>
                </div>
                <div className="task-statistics">
                    {task.completed} из {task.total}
                </div>
            </div>
            {isExpanded ?
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
                :
                <div className="task-card-footer">
                    <button className="details-button" onClick={handleToggle}>Подробнее</button>
                </div>
            }
        </div >
    );
}

export default TaskCard;
