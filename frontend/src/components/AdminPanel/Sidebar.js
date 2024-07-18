import React from 'react';
import './Sidebar.css';
import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

const SidebarHeader = () => (
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
);

const MenuConstructor = (menuItem, onMenuClick, isActive) => (
  <li key={menuItem.logo} onClick={() => onMenuClick(menuItem)}>
    <a href={menuItem.href} className={isActive ? 'active' : ''}>
      <img src={images[`${menuItem.logo}.svg`]} alt="logo" />
      {menuItem.title}
    </a>
  </li>
);

const SidebarMenu = ({ menus, onMenuClick, activeMenu }) => (
  <ul className="sidebar-menu">
    {menus.map(menuItem => MenuConstructor(menuItem, onMenuClick, activeMenu.logo === menuItem.logo))}
  </ul>
);

const SidebarFooter = () => (
  <div className="sidebar-footer">
    <button>Добавить задачу</button>
    <button>Добавить сессию</button>
  </div>
);

export default function Sidebar({ menus, onMenuClick, activeMenu }) {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <SidebarMenu menus={menus} onMenuClick={onMenuClick} activeMenu={activeMenu} />
      <SidebarFooter />
    </div>
  );
}
