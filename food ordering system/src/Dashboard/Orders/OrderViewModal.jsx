import React from 'react';

const OrderViewModal = ({ order, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>View Order</h2>
      <p><b>Order ID:</b> {order.id}</p>
      <p><b>Customer:</b> {order.customer}</p>
      <p><b>Date:</b> {order.date}</p>
      <p><b>Items:</b> {order.items}</p>
      <p><b>Total:</b> ${order.total.toFixed(2)}</p>
      <p><b>Payment:</b> {order.payment}</p>
      <p><b>Status:</b> {order.status}</p>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default OrderViewModal;
