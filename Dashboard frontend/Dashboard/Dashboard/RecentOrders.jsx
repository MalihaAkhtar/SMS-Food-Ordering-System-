import React, { useState, useEffect } from 'react';
import './Dashboardcomponents.css';

const statusStyles = {
  Delivered: 'status-delivered',
  Preparing: 'status-preparing',
  Pending: 'status-pending',
  // add other statuses if needed
};

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/admin/orders')
      .then(res => res.json())
      .then(data => {
        // Take last 5 orders, or all if less than 5
        const latestOrders = data.slice(0, 5);
        setOrders(latestOrders);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch orders:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white">Loading recent orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-white">No recent orders found.</div>;
  }

  // Helper to get initials from customer name
  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  return (
    <div className="recent-orders-container">
      <h3 className="text-white text-lg font-semibold mb-2">Recent Orders</h3>
      <p className="text-gray-400 text-sm mt-0">Latest Customer Orders</p>

      {orders.map((order, index) => (
        <div key={order.id || index} className="order-row">
          <div className="avatar-circle">{getInitials(order.customer)}</div>

          <div className="order-info">
            <div className="order-name">{order.customer}</div>
            <div className="order-items">{order.product}</div>
          </div>

          <div className="order-amount">${Number(order.price * order.quantity).toFixed(2)}</div>

          <span className={`order-status ${statusStyles[order.status] || ''}`}>
            {order.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
