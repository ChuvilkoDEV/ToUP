import React, { useState } from 'react';
import { useTable } from 'react-table';
import ImageUtils from '../imageUtils';

const images = ImageUtils.importAllImages(require.context('@assets/admin', false, /\.(svg)$/));

function SessionsTable({ columns, data, title }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const stats = [
    { label: 'Всего 8461', key: 'total' },
    { label: 'Работают 4764', key: 'active' },
    { label: 'Восстановлено 1052', key: 'restored' },
    { label: 'Забанено 2644', key: 'banned' },
    { label: 'Прокси 1', key: 'proxy' },
  ];
  const [activeStat, setActiveStat] = useState('total');

  const handleStatClick = (key) => {
    setActiveStat(key);
  };

  return (
    <div className="session">
      <h1>{title}</h1>
      <div className='stats-container'>
        <div className="stats">
          {stats.map(stat => (
            <div
              key={stat.key}
              className={`stat-item ${activeStat === stat.key ? 'active' : ''}`}
              onClick={() => handleStatClick(stat.key)}
            >
              {stat.label}
            </div>
          ))}
        </div>
        <div className='button-group'>
          <img src={images['refresh.svg']} alt="logo" className="refresh-btn" />
          <input type="text" placeholder="Поиск пользователей" className="admin-session-search" />
          <div className='admin-session-button'>
            <img src={images['search.svg']} alt="search" />
          </div>
          <div className='admin-session-button'>
            <img src={images['sort.svg']} alt="sort" />
          </div>
        </div>
      </div>
      <div className="data-table">
        <div className="table-container">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => {
                    const { key, ...rest } = column.getHeaderProps();
                    return (
                      <th key={key} {...rest}>{column.render('Header')}</th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                const { key, ...rest } = row.getRowProps();
                return (
                  <tr key={key} {...rest}>
                    {row.cells.map(cell => {
                      const { key, ...rest } = cell.getCellProps();
                      return (
                        <td key={key} {...rest}>{cell.render('Cell')}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <button className="show-more">Показать еще 8456</button>
    </div>
  );
}

export default SessionsTable;
