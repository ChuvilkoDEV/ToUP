import React from 'react';
import Statistics from './Statistics';
import AccountTable from './AccountTable';
import Sidebar from './Sidebar';
import Header from './Admin.Header';
import './AdminPanel.css';

function AdminPanel() {
  return (
    <div className='admin-panel'>
      <Sidebar />
      <div>
        <Header />
        <div className="main-content-area">
          {/* <Statistics />
          <AccountTable /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
