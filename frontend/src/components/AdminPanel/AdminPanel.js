import React, { useState } from 'react';
import Sessions from './Sessions';
import Sidebar from './Sidebar';
import AdminHeader from './Admin.Header';
import './AdminPanel.css';

const menus = [
  { 'logo': 'accounts', 'title': 'Все аккаунты', 'href': '#' },
  { 'logo': 'tasks', 'title': 'Все задачи', 'href': '#' },
  { 'logo': 'support', 'title': 'Тех. поддержка', 'href': '#' },
];

function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState(menus[0]); // Изначально активное меню - первое в списке

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className='admin-panel'>
      <Sidebar menus={menus} onMenuClick={handleMenuClick} activeMenu={activeMenu} />
      <div className='right-sidebar'>
        <AdminHeader activeMenu={activeMenu} />
        <div className="main-content-area">
          <Sessions />
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
