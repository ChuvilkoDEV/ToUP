import React, { useEffect, useState } from 'react';
import BlueRectangle from './BlueRectangle'
import TaskForm from './TaskForm';
import './TaskWindow.css';
import TaskSettings from './AdvancedSettings/TaskSettings'


const TaskWindow = ({ onClose }) => {
    const [isTaskSettingOpen, setIsTaskSettingOpen] = useState(false);

    const handleTaskSettingMenu = () => {
        setIsTaskSettingOpen(!isTaskSettingOpen);
    };

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
                    {isTaskSettingOpen ?
                        <TaskSettings handleTaskSettingMenu={handleTaskSettingMenu} /> :
                        <>
                            <TaskForm onClose={onClose} handleTaskSettingMenu={handleTaskSettingMenu} />
                            <BlueRectangle />
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskWindow;
