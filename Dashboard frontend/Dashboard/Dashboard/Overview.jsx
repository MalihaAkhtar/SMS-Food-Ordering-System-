import React, { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import RevenueChart from './RevenueChart';
import RecentOrders from './RecentOrders';
import './Overview.css';

const Overview = () => {
  const [stats, setStats] = useState({
    revenue: null,
    orders: null,
    users: null,
    pendingOrders: null,
  });

  useEffect(() => {
    // Fetch revenue
    fetch('http://localhost:5001/api/overview/revenue')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, revenue: data })))
      .catch(console.error);

    // Fetch orders
    fetch('http://localhost:5001/api/overview/orders')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, orders: data })))
      .catch(console.error);

    // Fetch users
    fetch('http://localhost:5001/api/overview/users')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, users: data })))
      .catch(console.error);

    // Fetch pending orders
    fetch('http://localhost:5001/api/overview/pending-orders')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, pendingOrders: data })))
      .catch(console.error);
  }, []);

  if (!stats.revenue || !stats.orders || !stats.users || !stats.pendingOrders) {
    return <div>Loading dashboard...</div>;
  }

  // Helper to safely format numbers with fallback
  const safeNumber = (num, decimals = 0) => {
    const n = Number(num);
    return isNaN(n) ? (decimals > 0 ? (0).toFixed(decimals) : '0') : (decimals > 0 ? n.toFixed(decimals) : n.toString());
  };

  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>Dashboard</h2>
        <p>Overview of your food ordering system's performance</p>
      </div>
      <div className="stats-grid">
        <StatsCard
          title="Total Revenue"
          value={`$${safeNumber(stats.revenue.totalRevenue, 2)}`}
          icon="💰"
          color="green"
          percentage={`↑ ${safeNumber(stats.revenue.revenueChangePercent)}% from last month`}
        />
        <StatsCard
          title="Total Orders"
          value={`+${safeNumber(stats.orders.totalOrders)}`}
          icon="📦"
          color="green"
          percentage={`↑ ${safeNumber(stats.orders.ordersChangePercent)}% from last month`}
        />
        <StatsCard
          title="Active Users"
          value={`+${safeNumber(stats.users.activeUsers)}`}
          icon="👤"
          color="green"
          percentage={`↑ ${safeNumber(stats.users.usersChangePercent)}% from last month`}
        />
        <StatsCard
          title="Pending Orders"
          value={safeNumber(stats.pendingOrders.count)}
          icon="⏱️"
          color="red"
          percentage={`↓ ${safeNumber(stats.pendingOrders.changePercent)}% from last month`}
        />
      </div>
      <div className="charts-section">
        <div className="revenue-chart"><RevenueChart /></div>
        <div className="recent-orders"><RecentOrders /></div>
      </div>
    </div>
  );
};

export default Overview;
