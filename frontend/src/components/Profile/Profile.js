import React from 'react';
import './Profile.css';
import ProfileCard from './ProfileCard';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('../../assets/profile', false, /\.(svg)$/));

const Profile = () => {
    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1>Добро пожаловать, Дмитрий</h1>
            </header>

            <section className="subscription-section">
                <div className="subscription-banner">
                    <div className="subscription-text">
                        <h2>Приобретите подписку по выгодной цене</h2>
                        <p>Что вы получите:</p>
                        <div className="subscription-details">
                            <div className="detail-item">
                                <p>5 000 ботов</p>
                                <span>Для просмотра, реакций и подписчиков</span>
                            </div>
                            <div className="detail-item">
                                <p>10 каналов</p>
                                <span>Подписка действует до 5 каналов телеграм</span>
                            </div>
                        </div>
                        <button className="subscription-button">Приобрести сейчас</button>
                    </div>
                    <div className="subscription-image">
                        <img src={images['chuvachki.svg']} alt="logo" />
                    </div>
                </div>
            </section>

            <section className="cards-section">
                <ProfileCard
                    title="Настройки профиля"
                    text="Перейти"
                    icon="profileSetting"
                />
                <ProfileCard
                    title="Управление задачами"
                    text="Начать работу"
                    icon="taskManage"
                />
                <ProfileCard
                    title="Кошелек"
                    text="Перейти"
                    icon="wallet"
                />
            </section>
        </div>
    );
};

export default Profile;
