import React, {useState} from 'react';
import SessionWindow from './Sessions/SessionWindow';
import './Sidebar.css';

import { HandySvg } from 'handy-svg';
import ImageUtils from '@components/imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

export default function Sidebar({ menus, onMenuClick, activeMenu }) {
  const [isSessionWindowOpen, setIsSessionWindowOpen] = useState(false);

  const handleSessionWindow = () => (
    setIsSessionWindowOpen(!isSessionWindowOpen)
  );

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
        <HandySvg src={images[`${menuItem.logo}.svg`]} className={`logo-15x15 currentColor`} />
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
      <button onClick={handleSessionWindow}>Добавить сессию</button>
      {isSessionWindowOpen && <SessionWindow />}
    </div>
  );

  return (
    <div className="sidebar">
      <SidebarHeader />
      <SidebarMenu menus={menus} onMenuClick={onMenuClick} activeMenu={activeMenu} />
      <SidebarFooter />
    </div>
  );
}
