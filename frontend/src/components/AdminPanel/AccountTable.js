import React from 'react';
import './AccountTable.css';

function AccountTable() {
    const accounts = [
        { id: 1, username: 'Дмитриева Анна', banStatus: 'Бан', email: 'Dmitrieva.anna@gmail.com', channelLink: 'https://t.me/o...', subscribe: 'Default', tasks: '1/32', support: 'Закрыт', date: '2024-06-22' },
        { id: 2, username: 'Сухарева Кира', banStatus: 'Активен', email: 'Dmitrieva.anna@gmail.com', channelLink: 'https://t.me/o...', subscribe: 'Advanced', tasks: '15/20', support: 'В ожидании', date: '2024-06-22' },
        // Add other accounts similarly
    ];

    return (
        <div className="account-table">
            <div className="account-table-header">
                <span>All</span>
                <span>Username</span>
                <span>BAN status</span>
                <span>Email</span>
                <span>Channel link</span>
                <span>Subscribe</span>
                <span>Tasks</span>
                <span>Support</span>
                <span>Date</span>
            </div>
            {accounts.map(account => (
                <div className="account-table-row" key={account.id}>
                    <span>{account.id}</span>
                    <span>{account.username}</span>
                    <span>{account.banStatus}</span>
                    <span>{account.email}</span>
                    <span><a href={account.channelLink}>Link</a></span>
                    <span>{account.subscribe}</span>
                    <span>{account.tasks}</span>
                    <span>{account.support}</span>
                    <span>{account.date}</span>
                </div>
            ))}
        </div>
    );
}

export default AccountTable;
