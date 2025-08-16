import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderViewModal from './OrderViewModal';
import OrderEditModal from './OrderEditModal';
import './Orders.css';

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [openActionMenu, setOpenActionMenu] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/admin/orders");
      console.log("Fetched orders:", res.data);
      const mappedOrders = res.data.map(order => ({
        id: order.id,
        customer: order.customer || order.user_name || 'N/A',
        date: order.date || order.created_at || '',
        product: order.product || order.product_title || 'N/A',
        price: order.price || order.product_price || 0,
        product_quantity: order.quantity || order.product_quantity || 0,
        payment_method: order.payment_method || 'N/A',
        status: order.status || order.tracking_status || 'Order Placed',
        email: order.email || '',
        country: order.country || '',
        address: order.address || '',
        description: order.description || '',
        image: order.image || ''
      }));
      setOrdersData(mappedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    setFilteredOrders(
      ordersData.filter(order => {
        const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
        const orderDate = order.date ? order.date.split('T')[0] : '';
        const matchesDate =
          dateFilter === 'All' ||
          (dateFilter === 'Today' && orderDate === today) ||
          (dateFilter === 'Yesterday' && orderDate === yesterday);
        return matchesSearch && matchesStatus && matchesDate;
      })
    );
  }, [ordersData, searchTerm, statusFilter, dateFilter]);

  // View order handler
  const handleView = (order) => {
    console.log("View clicked for order:", order.id);
    setViewingOrder(order);
    setOpenActionMenu(null);
  };

  // Edit order handler
  const handleEdit = (order) => {
    setEditingOrder(order);
    setOpenActionMenu(null);
  };

  // Delete order handler
  const handleDelete = async (order) => {
    console.log("Delete clicked for order:", order.id);
    if (window.confirm(`Are you sure you want to delete order ${order.id}?`)) {
      try {
        await axios.delete(`http://localhost:5001/api/admin/orders/${order.id}`);
        console.log("Deleted order:", order.id);
        fetchOrders();
        setOpenActionMenu(null);
      } catch (err) {
        console.error('Failed to delete order', err);
        alert('Failed to delete order. Please try again.');
      }
    }
  };

  // Save edit changes handler
  const handleSaveEdit = async (updatedOrder) => {
    try {
      const payload = {
        product_quantity: updatedOrder.product_quantity,
        product_price: updatedOrder.product_price,
        status: updatedOrder.status,
      };

      await axios.put(
        `http://localhost:5001/api/admin/orders/${updatedOrder.id}`,
        payload
      );

      console.log('Order updated successfully');
      fetchOrders();
      setEditingOrder(null);
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order. Please try again.');
    }
  };

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h2>Orders</h2>
        <p style={{ marginBottom: '20px', color: '#a1a1aa' }}>
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
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Order Placed">Order Placed</option>
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
            <th>Total ($)</th>
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
                <td>{order.date ? new Date(order.date).toLocaleString() : 'N/A'}</td>
                <td>{order.product}</td>
                <td>
                  {order.price && order.product_quantity
                    ? (order.price * order.product_quantity).toFixed(2)
                    : '0.00'}
                </td>
                <td>{order.payment_method}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase().replace(/\s/g, '-')}`}>
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

      {viewingOrder && (
        <OrderViewModal
          order={viewingOrder}
          onClose={() => setViewingOrder(null)}
        />
      )}

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
