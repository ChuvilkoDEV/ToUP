import React from 'react';
import './Admin.Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <input type="text" placeholder="Поиск..." className="search-input" />
        <div className="user-info">
          <span>Евгений</span>
          <span>Админ</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
