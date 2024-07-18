import React from 'react';
import './Admin.Header.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));


const HeaderLeft = ({ activeMenu }) => (
  <div className="admin-header-left">
    <img src={images[`${activeMenu.logo}.svg`]} alt="logo" />
    {activeMenu.title}
  </div>
);

const HeaderRight = () => (
  <div className="admin-header-content">
    <input type="text" placeholder="Поиск..." className="admin-search-input" />
    <img src={images['lightTheme.svg']} alt="logo" className="admin-theme-toggle" />
    <div className="admin-divider"></div>
    <img src={images['profilelogo.svg']} alt="logo" className="admin-profile-logo" />
    <div className="admin-user-info">
      <span className="admin-header-user-name">Евгений</span>
      <span className="admin-header-role">Админ</span>
    </div>
  </div>
);

function AdminHeader({ activeMenu }) {
  return (
    <div className="admin-header">
      <HeaderLeft activeMenu={activeMenu} />
      <HeaderRight />
    </div>
  );
}

export default AdminHeader;
