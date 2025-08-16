import React, { useState } from 'react';
import './Modal.css';

const ProductEditModal = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [status, setStatus] = useState(product.status || 'Available');

  const handleSave = async () => {
    try {
      const updatedProduct = {
        name,
        price: parseFloat(price),
        status,
      };

      const response = await fetch(`http://localhost:5001/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const data = await response.json();

      alert(`Product updated successfully: ${data.message || name}`);

      if (onUpdate) onUpdate();

      onClose();
    } catch (error) {
      alert('Error updating product: ' + error.message);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Product</h2>

        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Price</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>

        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductEditModal;
