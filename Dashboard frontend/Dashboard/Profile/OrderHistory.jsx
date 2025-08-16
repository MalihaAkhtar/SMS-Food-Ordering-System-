import React from 'react';
import './ProfilePages.css';

const OrderHistory = () => {
  const orders = [
    { id: 101, date: '2025-05-01', status: 'Delivered', total: '₨ 2,500' },
    { id: 102, date: '2025-05-10', status: 'Processing', total: '₨ 1,200' },
  ];

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'status-badge delivered';
      case 'processing':
        return 'status-badge processing';
      case 'cancelled':
        return 'status-badge cancelled';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="profile-content">
      <h1>Order History</h1>
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(({ id, date, status, total }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{date}</td>
                <td><span className={getStatusClass(status)}>{status}</span></td>
                <td>{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
