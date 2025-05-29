import React, { useState } from 'react';

const OrderEditModal = ({ order, onClose, onSave }) => {
  const [customer, setCustomer] = useState(order.customer);
  const [items, setItems] = useState(order.items);
  const [total, setTotal] = useState(order.total);
  const [status, setStatus] = useState(order.status);

  const handleSave = () => {
    onSave({
      ...order,
      customer,
      items: Number(items),
      total: Number(total),
      status,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Order</h2>

        <label>Customer</label>
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} />

        <label>Items</label>
        <input
          type="number"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          min="1"
        />

        <label>Total</label>
        <input
          type="number"
          step="0.01"
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          min="0"
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Delivered">Delivered</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
        </select>

        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="cancel-btn" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default OrderEditModal;
