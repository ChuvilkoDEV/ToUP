import React from 'react';
import './Statistics.css';

function Statistics() {
    return (
        <div className="statistics">
            <div className="statistics-item">
                <h3>12 054</h3>
                <span>Зарегистрировано</span>
            </div>
            <div className="statistics-item">
                <h3>3 731</h3>
                <span>Забанено</span>
            </div>
            <div className="statistics-item">
                <h3>971</h3>
                <span>Новых пользователей</span>
            </div>
            <div className="statistics-item">
                <h3>8 145</h3>
                <span>Задач за сегодня</span>
            </div>
        </div>
    );
}

export default Statistics;
