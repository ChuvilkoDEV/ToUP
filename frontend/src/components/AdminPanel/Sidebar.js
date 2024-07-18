import React from 'react';
import './Sidebar.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/header', false, /\.(svg)$/));

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-container">
          <h1 className="sidebar-header-title">
            T
            <img src={images['telegram.svg']} alt="logo" className='sidebar-header-logo' />
            UP
          </h1>
        </div>
        <hr />
      </div>
      <ul className="sidebar-menu">
        <li><a href="#">Все аккаунты</a></li>
        <li><a href="#">Управление аккаунтами</a></li>
        <li><a href="#">Все задачи</a></li>
      </ul>
      <div className="sidebar-footer">
        <button>Добавить задачу</button>
        <button>Добавить сессию</button>
      </div>
    </div>
  );
}

export default Sidebar;
