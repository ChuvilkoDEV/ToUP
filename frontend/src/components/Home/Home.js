import React from 'react';
import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import './Home.css'
const Home = () => {
  return (
    <>
      <Header />
      <div className='home'>
        <h1>Главная страница</h1>
        <p>Добро пожаловать на главную страницу!</p>
      </div>
      <Footer />
    </>
  );
}

export default Home;
