import React, { useState } from 'react';
import axios from 'axios';
import InputField from '../../shared/InputField';
import Subscribers from './TaskTypes/Subscribers';
import Reactions from './TaskTypes/Reactions';
import Views from './TaskTypes/Views'
import './TaskForm.css'
import ImageUtils from '../../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/tasks', false, /\.(svg)$/));

const TaskForm = ({ onClose, handleTaskSettingMenu }) => {
    const [isAutoTask, setIsAutoTask] = useState(false);
    const [selectedType, setSelectedType] = useState('subscribers');

    const handleTaskTypeClick = (type) => {
        setIsAutoTask(type === 'auto');
    };

    const handleSelectChange = (e) => {
        setSelectedType(e.target.value);
    };

    const TaskCreationSection = () => (
        <>
            <h2>Создайте задачу за пару кликов</h2>
            <div className='type-task-buttons-container'>
                <button
                    className={`type-task-button ${!isAutoTask ? 'active' : ''}`}
                    onClick={() => handleTaskTypeClick('task')}
                >
                    Задача
                </button>
                <button
                    className={`type-task-button ${isAutoTask ? 'active' : ''}`}
                    onClick={() => handleTaskTypeClick('auto')}
                >
                    Авто задача
                </button>
            </div>
            <div className='task-form-count-bots'>
                <div className='left-side-bots'>
                    <p className='mb-0'>У вас имеется</p>
                    <div className="bot-info-container">
                        <img src={images['user-robot.svg']} alt="logo" className="bot-icon" />
                        <p className="bot-count">4000 ботов</p>
                    </div>
                </div>
                <div className='right-side-bots'>
                    <img src={images['info.svg']} alt="info" />
                </div>
            </div>
            <InputField
                label="Действия"
                type="select"
                placeholder="Выберите..."
                logo={images['todo.svg']}
                value={selectedType}
                onChange={handleSelectChange}
                options={[
                    { label: 'Подписка', value: 'subscribers' },
                    { label: 'Реакции', value: 'reactions' },
                    { label: 'Просмотры', value: 'views' },
                ]}
            />
        </>
    );

    return (
        <div className="task-form">
            <TaskCreationSection />
            {selectedType === 'subscribers' ?
                <Subscribers />
                : selectedType === 'reactions' ?
                    <Reactions handleTaskSettingMenu={handleTaskSettingMenu} />
                    :
                    <Views handleTaskSettingMenu={handleTaskSettingMenu} />
            }
        </div>
    );
};

export default TaskForm;
