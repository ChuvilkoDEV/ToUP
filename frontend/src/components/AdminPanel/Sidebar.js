import React from 'react';
import './Sidebar.css';

import ImageUtils from '../imageUtils';
const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

const menus = [
  { 'logo': 'accounts', 'title': 'Все аккаунты', 'href': '#' },
  { 'logo': 'tasks', 'title': 'Все задачи', 'href': '#' },
  { 'logo': 'support', 'title': 'Тех. поддержка', 'href': '#' },
]

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

const MenuConstructor = (menuItem) => (
  <li key={menuItem.logo}>
    <a href={menuItem.href}>
      <img src={images[`${menuItem.logo}.svg`]} alt="logo" />
      {menuItem.title}
    </a>
  </li>
);

const SidebarMenu = () => (
  <ul className="sidebar-menu">
    {menus.map(MenuConstructor)}
  </ul>
)

const SidebarFooter = () => (
  <div className="sidebar-footer">
    <button>Добавить задачу</button>
    <button>Добавить сессию</button>
  </div>
)

export default function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <SidebarMenu />
      <SidebarFooter />
    </div>
  );
}