import React, { useEffect } from 'react';
import TaskForm from './TaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskWindow.css';

const TaskWindow = ({ onClose }) => {
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

    return (
        <div className="task-window-overlay">
            <div className="task-window">
                <div className="task-content">
                    <TaskForm onClose={onClose} />
                </div>
            </div>
        </div>
    );
};

export default TaskWindow;
