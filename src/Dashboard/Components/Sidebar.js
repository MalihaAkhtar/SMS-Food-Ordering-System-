import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaShoppingBag,
  FaUsers,
  FaCreditCard,
  FaCommentAlt,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

const menuItems = [
  { title: "Dashboard", path: "/dashboard", icon: <FaChartBar /> },
  { title: "Products", path: "/products", icon: <FaShoppingBag /> },
  { title: "Orders", path: "/orders", icon: <FaShoppingBag /> },
  { title: "Users", path: "/users", icon: <FaUsers /> },
  { title: "Payments", path: "/payments", icon: <FaCreditCard /> },
  { title: "Feedback", path: "/feedback", icon: <FaCommentAlt /> },
];

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Close the sidebar if the path is dashboard
    if (location.pathname === "/dashboard") {
      setIsOpen(false);
    }
  }, [location]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={handleToggle}
      ></div>

      {/* Sidebar Container */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="logo" onClick={handleToggle}>
            <span className="logo-text">FoodAdmin</span>
          </Link>
          <button className="close-btn" onClick={handleToggle}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={handleToggle}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => alert("Logging out...")}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Toggle button (mobile) */}
      <button className="toggle-sidebar-btn" onClick={handleToggle}>
        <FaBars />
      </button>
    </>
  );
};

export default Sidebar;
