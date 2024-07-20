import React from 'react';
import SessionsTable from './SessionsTable';
import './Sessions.css';

const data1 = [
  { id: 1, status: 'Бан', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 2, status: 'Работает', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 3, status: 'Прокси', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 4, status: 'Бан', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 5, status: 'Работает', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
];

const data2 = [
  { id: 6, status: 'Бан', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 7, status: 'Работает', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 8, status: 'Прокси', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 9, status: 'Бан', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
  { id: 10, status: 'Работает', filename: '123856793', group: 'Test', category: 'Default', date: '2024-06-22 00:21:00' },
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

  return (
    <>
      <SessionsTable columns={columns} data={data1} title="Список моего аккаунта" />
      <SessionsTable columns={columns} data={data2} title="Список всех аккаунтов" />
    </>
  );
}

export default Sessions;
