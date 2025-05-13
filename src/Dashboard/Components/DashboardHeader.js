"use client";

import { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import "./DashboardHeader.css";

const DashboardHeader = () => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    setNotificationsOpen(false);
  };

  return (
    <div className="dashboard-header">
      <div>
        <h1 className="header-title">Dashboard</h1>
        <p className="header-date">{date}</p>
      </div>

      <div className="header-actions">
        {/* Notification Icon */}
        <div className="dropdown">
          <button className="btn-icon" onClick={toggleNotifications}>
            <FaBell />
            <span className="notification-badge"></span>
          </button>

          <div
            className={`dropdown-content notifications-dropdown ${notificationsOpen ? "show" : ""}`}
          >
            <div className="dropdown-label">Notifications</div>
            <div className="dropdown-divider"></div>
            <div className="notifications-list">
              <div className="dropdown-item">
                <div className="notification-content">
                  <p className="notification-title">New order received</p>
                  <p className="notification-desc">Order #1234 from John Doe</p>
                  <p className="notification-time">2 minutes ago</p>
                </div>
              </div>
              <div className="dropdown-item">
                <div className="notification-content">
                  <p className="notification-title">Payment successful</p>
                  <p className="notification-desc">Order #1233 payment completed</p>
                  <p className="notification-time">1 hour ago</p>
                </div>
              </div>
              <div className="dropdown-item">
                <div className="notification-content">
                  <p className="notification-title">New user registered</p>
                  <p className="notification-desc">Jane Smith created an account</p>
                  <p className="notification-time">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Menu */}
        <div className="dropdown">
          <button className="btn-icon" onClick={toggleUserMenu}>
            <FaUser />
          </button>

          <div className={`dropdown-content user-dropdown ${userMenuOpen ? "show" : ""}`}>
            <div className="dropdown-label">My Account</div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">Logout</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
