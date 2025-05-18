import React from 'react';
import StatsCard from './StatsCard';
import RevenueChart from './RevenueChart';
import RecentOrders from './RecentOrders';
import './Overview.css'; // Import ELDA CSS

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="overview-header">
        <h2>Dashboard</h2>
        <p>Overview of your food ordering system's performance</p>
      </div>
      <div className="stats-grid">
        <StatsCard title="Total Revenue" value="$45,231.89" icon="💰" color="green" percentage="↑ 20.1% from last month" />
        <StatsCard title="Total Orders" value="+2350" icon="📦" color="green" percentage="↑ 12.5% from last month" />
        <StatsCard title="Active Users" value="+573" icon="👤" color="green" percentage="↑ 8.2% from last month" />
        <StatsCard title="Pending Orders" value="38" icon="⏱️" color="red" percentage="↓ 4.1% from last month" />
      </div>
      <div className="charts-section">
        <div className="revenue-chart"><RevenueChart /></div>
        <div className="recent-orders"><RecentOrders /></div>
      </div>
    </div>
  );
};

export default Overview;
