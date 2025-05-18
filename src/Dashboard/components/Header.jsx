import React, { useState, useEffect, useRef } from 'react';
import './Header.css';

const notificationsList = [
  { user: 'Alex Johnson', message: 'New order received' },
  { user: 'Sara Wilson', message: 'Payment confirmed' },
  { user: 'Michael Brown', message: 'Delivery delayed' },
];

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Count unread notifications (you can add logic later to mark read/unread)
  const unreadCount = notificationsList.length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <h1>FoodAdmin</h1>
      <div className="icons">
        <div className="notification-wrapper" ref={notificationRef}>
          <span
            className="notification"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false); // close profile if open
            }}
          >
            🔔
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </span>
          {showNotifications && (
            <div className="dropdown notification-dropdown">
              {notificationsList.map((note, idx) => (
                <div key={idx} className="notification-item">
                  <strong>{note.user}:</strong> {note.message}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <span
            className="user"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false); // close notifications if open
            }}
          >
            👤
          </span>
          {showProfile && (
  <div className="dropdown profile-dropdown">
    <div className="profile-option">👤 Profile</div>
    <div className="profile-option">⚙️ Settings</div>
    <div className="profile-option">❓ Help</div>
    <div className="profile-option">🚪 Logout</div>
  </div>
)}

        
        </div>
      </div>
    </header>
  );
};

export default Header;
