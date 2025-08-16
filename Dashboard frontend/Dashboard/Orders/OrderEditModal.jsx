import React, { useState } from 'react';
import axios from 'axios';

const OrderEditModal = ({ order, onClose, onSave }) => {
  const [customer, setCustomer] = useState(order.customer || '');
  const [product_quantity, setProductQuantity] = useState(order.product_quantity || 0);
  const [product_price, setProductPrice] = useState(order.product_price || 0);
  const [status, setStatus] = useState(order.status || 'Order Placed');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedOrder = {
      ...order,
      customer,
      product_quantity: parseInt(product_quantity),
      product_price: parseFloat(product_price),
      status,
    };

    try {
      await axios.put(`http://localhost:5001/api/admin/orders/${order.id}`, updatedOrder);
      onSave(updatedOrder);
      onClose();
    } catch (error) {
      console.error("Failed to update order:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit}>
          <label>Customer:</label>
          <input value={customer} onChange={e => setCustomer(e.target.value)} />

          <label>Quantity:</label>
          <input
            type="number"
            value={product_quantity}
            onChange={e => setProductQuantity(e.target.value)}
          />

          <label>Price:</label>
          <input
            type="number"
            value={product_price}
            onChange={e => setProductPrice(e.target.value)}
          />

          <label>Status:</label>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>Order Placed</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
          </select>

          <div className="form-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderEditModal;
