import React from 'react';

const OrderViewModal = ({ order, onClose }) => {
  if (!order) return null;

  // Convert price and quantity safely to numbers
  const price = Number(order.price) || 0;
  const quantity = Number(order.product_quantity) || 0;
  const total = (price * quantity).toFixed(2);

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>View Order</h2>
        <p><b>Order ID:</b> {order.id}</p>
        <p><b>Customer:</b> {order.customer}</p>
        <p><b>Date:</b> {order.date ? new Date(order.date).toLocaleString() : 'N/A'}</p>
        <p><b>Items:</b> {order.product}</p>
        <p><b>Quantity:</b> {quantity}</p>
        <p><b>Price per item:</b> ${price.toFixed(2)}</p>
        <p><b>Total:</b> ${total}</p>
        <p><b>Payment:</b> {order.payment_method || 'N/A'}</p>
        <p><b>Status:</b> {order.status}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderViewModal;
