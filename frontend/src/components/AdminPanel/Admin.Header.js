import React, { useContext } from 'react';
import './Admin.Header.css';
import { ThemeContext } from '../../context/ThemeContext';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

function AdminHeader({ activeMenu }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const HeaderLeftDesktop = ({ activeMenu }) => (
    <div className="admin-header-desktop-left">
      <img src={images[`${activeMenu.logo}.svg`]} alt="logo" />
      {activeMenu.title}
    </div>
  );

  const HeaderLeftMobile = () => (
    <div className="admin-header-mobile-left">
      <h1 className="admin-header-mobile-title">
        T
        <img src={images['telegram.svg']} alt="logo" />
        UP
      </h1>
    </div>
  );

  const HeaderRightDesktop = () => (
    <div className="admin-header-desktop-content">
      <input type="text" placeholder="Поиск..." className="admin-search-input" />
      <img src={images['lightTheme.svg']} alt="logo" className="admin-theme-toggle" onClick={toggleTheme} />
      <div className="admin-divider"></div>
      <img src={images['profilelogo.svg']} alt="logo" className="admin-profile-logo" />
      <div className="admin-user-info">
        <span className="admin-header-user-name">Евгений</span>
        <span className="admin-header-role">Админ</span>
      </div>
      <div className='admin-header-hamburger-menu'>
        <img src={images['hamburger.svg']} alt="logo" />
      </div>
    </div>
  );

  return (
    <div className="admin-header">
      <HeaderLeftDesktop activeMenu={activeMenu} />
      <HeaderLeftMobile />
      <HeaderRightDesktop />
    </div>
  );
}

export default AdminHeader;
