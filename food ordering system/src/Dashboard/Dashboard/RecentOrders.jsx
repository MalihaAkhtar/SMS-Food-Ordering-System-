import React from 'react';
import './Dashboardcomponents.css';

const orders = [
  { initials: 'AJ', name: 'Alex Johnson', items: 'Burger Combo, Fries', amount: '$24.50', status: 'Delivered' },
  { initials: 'SW', name: 'Sara Wilson', items: 'Chicken Bowl, Soda', amount: '$18.25', status: 'Preparing' },
  { initials: 'MB', name: 'Michael Brown', items: 'Veggie Pizza, Wings', amount: '$32.75', status: 'Pending' },
  { initials: 'ED', name: 'Emma Davis', items: 'Pasta, Garlic Bread', amount: '$21.50', status: 'Delivered' },
  { initials: 'JS', name: 'John Smith', items: 'Salad, Smoothie', amount: '$16.90', status: 'Preparing' },
];

const statusStyles = {
  Delivered: 'status-delivered',
  Preparing: 'status-preparing',
  Pending: 'status-pending',
};

const RecentOrders = () => (
  <div className="recent-orders-container">
    <h3 className="text-white text-lg font-semibold mb-2">Recent Orders</h3>
    <p className="text-gray-400 text-sm  mt-0">Latest Customer Orders</p>

    {orders.map((order, index) => (
      <div key={index} className="order-row">
        <div className="avatar-circle">{order.initials}</div>

        <div className="order-info">
          <div className="order-name">{order.name}</div>
          <div className="order-items">{order.items}</div>
        </div>

        <div className="order-amount">{order.amount}</div>

        <span className={`order-status ${statusStyles[order.status]}`}>{order.status}</span>
      </div>
    ))}
  </div>
);

export default RecentOrders;
