import React, { useState, useEffect } from 'react';
import OrderViewModal from './OrderViewModal';
import OrderEditModal from './OrderEditModal';
import './Orders.css';

const ordersData = [
  { id: 'ORD-001', customer: 'John Doe', date: '2023-05-07 14:30', items: 3, total: 24.99, payment: 'Card', status: 'Delivered' },
  { id: 'ORD-002', customer: 'Jane Smith', date: '2023-05-07 15:45', items: 2, total: 32.50, payment: 'COD', status: 'Preparing' },
  { id: 'ORD-003', customer: 'Robert Johnson', date: '2023-05-07 16:20', items: 1, total: 18.75, payment: 'Card', status: 'Pending' },
  { id: 'ORD-004', customer: 'Emily Davis', date: '2023-05-06 12:15', items: 4, total: 42.00, payment: 'Card', status: 'Delivered' },
  { id: 'ORD-005', customer: 'Michael Wilson', date: '2023-05-06 13:40', items: 2, total: 15.25, payment: 'COD', status: 'Pending' },
  { id: 'ORD-006', customer: 'Sarah Brown', date: '2023-05-06 11:10', items: 3, total: 29.99, payment: 'Card', status: 'Delivered' },
  { id: 'ORD-007', customer: 'David Miller', date: '2023-05-05 18:30', items: 5, total: 53.75, payment: 'Card', status: 'Preparing' },
  { id: 'ORD-008', customer: 'Jennifer Taylor', date: '2023-05-05 14:20', items: 2, total: 21.50, payment: 'COD', status: 'Delivered' },
];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // New modal state:
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    setFilteredOrders(
      ordersData.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const orderDate = order.date.split(' ')[0];
        const matchesDate =
          dateFilter === 'All' ||
          (dateFilter === 'Today' && orderDate === today) ||
          (dateFilter === 'Yesterday' && orderDate === yesterday);
        return matchesSearch && matchesStatus && matchesDate;
      })
    );
  }, [searchTerm, statusFilter, dateFilter]);

  const handleView = (order) => {
    setViewingOrder(order);
    setOpenActionMenu(null);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setOpenActionMenu(null);
  };

  const handleDelete = (order) => {
    if (window.confirm(`Are you sure you want to delete order ${order.id}?`)) {
      setFilteredOrders(prev => prev.filter(o => o.id !== order.id));
      setOpenActionMenu(null);
    }
  };

  const handleSaveEdit = (updatedOrder) => {
    setFilteredOrders(prev =>
      prev.map(o => (o.id === updatedOrder.id ? updatedOrder : o))
    );
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <div className="orders-title"></div>
        <h2>Orders</h2>
       <p style={{ marginBottom: '20px' ,color:'#a1a1aa'}}>
  Manage Customer Orders and delivery status
</p>

      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search orders..."
          className="filter-input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <select
          className="filter-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
        </select>
        <select
          className="filter-select"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        >
          <option value="All">All Dates</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
        </select>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                No orders found.
              </td>
            </tr>
          ) : (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.date}</td>
                <td>{order.items}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>{order.payment}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td style={{ position: 'relative' }}>
                  <button
                    className="dots-btn"
                    onClick={() =>
                      setOpenActionMenu(openActionMenu === order.id ? null : order.id)
                    }
                  >
                    ⋯
                  </button>
                  {openActionMenu === order.id && (
                    <div className="action-dropdown">
                      <button onClick={() => handleView(order)}>View</button>
                      <button onClick={() => handleEdit(order)}>Edit</button>
                      <button onClick={() => handleDelete(order)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* View Modal */}
      {viewingOrder && (
        <OrderViewModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}

      {/* Edit Modal */}
      {editingOrder && (
        <OrderEditModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Orders;
