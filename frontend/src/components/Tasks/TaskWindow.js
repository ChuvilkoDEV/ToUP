import React, { useEffect } from 'react';
import TaskForm from './TaskForm';
import BlueRectangle from './BlueRectangle'
import 'bootstrap/dist/css/bootstrap.min.css';
import './TaskWindow.css';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/tasks', false, /\.(svg)$/));


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
                    <div className='task-form-blue-rectangle'>
                        <h1>Откройте себе новые возможности</h1>
                        <img src={images['chuvachki.svg']} alt="info" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskWindow;
