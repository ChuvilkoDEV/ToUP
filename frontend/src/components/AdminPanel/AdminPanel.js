import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AdminHeader from './Admin.Header';
import Sessions from './Sessions/Sessions';
import Accounts from './Accounts/Accounts';
import SessionWindow from './Sessions/SessionWindow';
import TaskWindow from '@components/Tasks/AddTask/TaskWindow';
import './AdminPanel.css';

const menus = [
  { 'logo': 'accounts', 'title': 'Все аккаунты', 'component': <Accounts /> },
  { 'logo': 'sessions', 'title': 'Сессии', 'component': <Sessions /> },
  { 'logo': 'tasks', 'title': 'Все задачи', 'component': <Accounts /> },
  { 'logo': 'support', 'title': 'Тех. поддержка', 'component': <Accounts /> },
];

function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState(menus[0]);
  const [isSessionWindowOpen, setIsSessionWindowOpen] = useState(false);
  const [isTaskWindowOpen, setIsTaskWindowOpen] = useState(false);


  const handleSessionWindow = () => (
    setIsSessionWindowOpen(!isSessionWindowOpen)
  );

  const handleTaskWindow = () => (
    setIsTaskWindowOpen(!isTaskWindowOpen)
  );

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className='admin-panel'>
      <Sidebar
        menus={menus} onMenuClick={handleMenuClick} activeMenu={activeMenu}
        handleSessionWindow={handleSessionWindow} handleTaskWindow={handleTaskWindow}
      />
      <div className='right-sidebar'>
        <AdminHeader activeMenu={activeMenu} />
        <div className="main-content-area">
          {activeMenu.component}
        </div>
      </div>
      {isSessionWindowOpen && <SessionWindow handleClose={handleSessionWindow} />}
      {isTaskWindowOpen && <TaskWindow handleClose={handleTaskWindow} />}
    </div>
  );
}

export default AdminPanel;
