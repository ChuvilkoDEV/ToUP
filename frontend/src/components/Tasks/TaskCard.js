// TaskCard.jsx
import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
    return (
        <div className="task-card">
            <div className="task-card-header">
                <div className="task-due-date">
                    {task.dueDate}
                </div>
                <div className="task-title">
                    {task.title}
                </div>
            </div>
            <div className="task-card-body">
                <div className="task-status">
                    {task.status}
                </div>
                <div className="task-progress">
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${task.progress}%` }}></div>
                    </div>
                    <div className="progress-info">
                        {task.progress}% ({task.completed} из {task.total})
                    </div>
                </div>
            </div>
            <div className="task-card-footer">
                <button className="details-button">Подробнее</button>
            </div>
        </div>
    );
}

export default TaskCard;
