import React, { useState } from 'react';
import InputField from '../shared/InputField';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './TaskForm.css';
import axios from 'axios';

const TaskForm = ({ onClose }) => {
    const [budget, setBudget] = useState('');
    const [duration, setDuration] = useState('');
    const [subscriberCount, setSubscriberCount] = useState('');
    const [channelLink, setChannelLink] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!budget || !duration || !subscriberCount || !channelLink || !taskDescription) {
            setError('Пожалуйста, заполните все поля.');
            return;
        }
        try {
            const response = await axios.post('http://your-api-url.com/api/task', {
                budget,
                duration,
                subscriberCount,
                channelLink,
                taskDescription
            });
            console.log(response.data);
            onClose();
        } catch (err) {
            console.error(err);
            setError('Ошибка при создании задачи.');
        }
    };

    return (
        <div className="task-form">
            <h2>Создайте задачу</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="Бюджет"
                    type="text"
                    placeholder="Укажите бюджет"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                />
                <InputField
                    label="Длительность"
                    type="text"
                    placeholder="Укажите длительность"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <InputField
                    label="Количество подписчиков"
                    type="text"
                    placeholder="Укажите количество подписчиков"
                    value={subscriberCount}
                    onChange={(e) => setSubscriberCount(e.target.value)}
                />
                <InputField
                    label="Ссылка на канал"
                    type="text"
                    placeholder="Укажите ссылку на канал"
                    value={channelLink}
                    onChange={(e) => setChannelLink(e.target.value)}
                />
                <InputField
                    label="Описание задачи"
                    type="text"
                    placeholder="Опишите задачу"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />
                <button type="submit">Запустить задачу</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default TaskForm;
