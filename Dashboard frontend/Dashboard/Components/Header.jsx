import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../Profile/UserContext';
import './Header.css';

const notificationsList = [
  { user: 'Alex Johnson', message: 'New order received' },
  { user: 'Sara Wilson', message: 'Payment confirmed' },
  { user: 'Michael Brown', message: 'Delivery delayed' },
];

const Header = () => {
  const { user } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notificationsList.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
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
      <Link to="/dashboard" className="header-logo-link">
        <h1>Welcome Admin!</h1>
      </Link>
      <div className="icons">
        <div className="icon-container" ref={notificationRef}>
          <span
            className="notification"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
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

        <div className="icon-container" ref={profileRef}>
          <span
            className="user"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="header-profile-image"
              />
            ) : (
              '👤'
            )}
          </span>
          {showProfile && (
            <div className="dropdown profile-dropdown">
              <Link to="/dashboard/profile" className="profile-option">👤 Profile</Link>
              <Link to="/dashboard/profile/settings" className="profile-option">⚙️ Settings</Link>
              <Link to="/dashboard/profile/help" className="profile-option">❓ Help</Link>
              <Link to="/dashboard/profile/logout" className="profile-option">🚪 Logout</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
