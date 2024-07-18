import React from 'react';
import './Profile.css';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import ProfileCard from './ProfileCard';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/profile', false, /\.(svg)$/));


const ProfileTitle = () => (
  <header className="profile-header">
    <h1>Добро пожаловать, Дмитрий</h1>
  </header>
);

const DetailItem = ({ title, description }) => (
  <div className="detail-item">
    <p>
      <img src={images['bots.svg']} alt="logo" />
      {title}
    </p>
    <span>{description}</span>
  </div>
);

const ProfileInfoSection = () => (
  <section className="subscription-section">
    <div className="subscription-banner">
      <div className="subscription-text">
        <h2>Приобретите подписку по выгодной цене</h2>
        <p>Что вы получите:</p>
        <div className="subscription-details">
          <DetailItem title='5 000 ботов' description='Для просмотра, реакций и подписчиков' />
          <DetailItem title='10 каналов' description='Подписка действует до 5 каналов телеграм' />
        </div>
        <button className="subscription-button">Приобрести сейчас</button>
      </div>
      <div className="subscription-image">
        <img src={images['chuvachki.svg']} alt="logo" />
      </div>
    </div>
  </section>
);

const CardSection = () => (
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
      link="/tasks"
    />
    <ProfileCard
      title="Кошелек"
      text="Перейти"
      icon="wallet"
    />
  </section>
);

const Profile = () => {
  return (
    <>
      <Header />
      <div className="profile-container">
        <ProfileTitle />
        <ProfileInfoSection />
        <CardSection />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
