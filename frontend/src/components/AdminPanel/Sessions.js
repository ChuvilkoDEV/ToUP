import React, { useState } from 'react';
import { useTable } from 'react-table';
import './Sessions.css';

const data = [
  { id: 1, status: 'Бан', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 2, status: 'Работает', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 3, status: 'Прокси', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 4, status: 'Бан', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 5, status: 'Работает', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
];

const columns = [
  {
    Header: '',
    accessor: 'select',
    Cell: ({ row }) => (
      <input type="checkbox" />
    ),
  },
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'BAN status',
    accessor: 'status',
    Cell: ({ value }) => {
      let className = '';
      if (value === 'Бан') className = 'status-ban';
      else if (value === 'Работает') className = 'status-active';
      else if (value === 'Прокси') className = 'status-proxy';
      return <span className={`status ${className}`}>
        <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} mr-5`}>
          <circle cx="2.5" cy="2.5" r="2.5" />
        </svg>
        {value}
      </span>;
    },
  },
  {
    Header: 'Filename',
    accessor: 'filename',
  },
  {
    Header: 'Group',
    accessor: 'group',
  },
  {
    Header: 'Category',
    accessor: 'category',
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
];

function Sessions() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const [activeStat, setActiveStat] = useState('total');

  const stats = [
    { label: 'Всего 8461', key: 'total' },
    { label: 'Работают 4764', key: 'active' },
    { label: 'Восстановлено 1052', key: 'restored' },
    { label: 'Забанено 2644', key: 'banned' },
    { label: 'Прокси 1', key: 'proxy' },
  ];

  const handleStatClick = (key) => {
    setActiveStat(key);
  };

  return (
    <div className="session">
      <h1>Список моего аккаунта</h1>
      <div className="stats">
        {stats.map(stat => (
          <span
            key={stat.key}
            className={`stat-item ${activeStat === stat.key ? 'active' : ''}`}
            onClick={() => handleStatClick(stat.key)}
          >
            {stat.label}
          </span>
        ))}
      </div>
      <button className="refresh-btn">🔄</button>
      <div className="table-container">
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="show-more">Показать еще 8456</button>
    </div>
  );
}

export default Sessions;
