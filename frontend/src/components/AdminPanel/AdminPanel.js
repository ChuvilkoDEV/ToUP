import React, { useState } from 'react';
import Sessions from './Sessions/Sessions';
import Sidebar from './Sidebar';
import AdminHeader from './Admin.Header';
import Accounts from './Accounts/Accounts';
import './AdminPanel.css';

const menus = [
  { 'logo': 'accounts', 'title': 'Все аккаунты', 'component': <Accounts /> },
  { 'logo': 'sessions', 'title': 'Сессии', 'component': <Sessions /> },
  { 'logo': 'tasks', 'title': 'Все задачи', 'component': <Accounts /> },
  { 'logo': 'support', 'title': 'Тех. поддержка', 'component': <Accounts /> },
];

function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState(menus[0]); 

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className='admin-panel'>
      <Sidebar menus={menus} onMenuClick={handleMenuClick} activeMenu={activeMenu} />
      <div className='right-sidebar'>
        <AdminHeader activeMenu={activeMenu} />
        <div className="main-content-area">
          {activeMenu.component}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
