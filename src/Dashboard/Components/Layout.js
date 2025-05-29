"use client"; // Safe to remove in React Router apps

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default open on desktop

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={`layout ${sidebarOpen ? "sidebar-open" : ""}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-wrapper">
        <header className="topbar">
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="app-title">Admin Dashboard</h1>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
