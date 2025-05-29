import React, { useState } from 'react';
import './ProfilePages.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Your order #101 has been delivered.', read: false },
    { id: 2, message: 'New discount offer available!', read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="profile-content">
      <h1>Notifications</h1>
      <ul className="notifications-list">
        {notifications.map(({ id, message, read }) => (
          <li
            key={id}
            className={`notification-item ${read ? 'read' : 'unread'}`}
            onClick={() => markAsRead(id)}
          >
            <span className="bullet">{!read && '●'}</span>
            <span className="notification-text">{message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
