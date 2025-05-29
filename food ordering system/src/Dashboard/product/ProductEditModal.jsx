// ProductEditModal.js
import React, { useState } from 'react';
import './Modal.css'
const ProductEditModal = ({ product, onClose }) => {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  // Add other fields as needed

  const handleSave = () => {
    // Save logic here — e.g., update your backend or state
    alert(`Saved changes for ${name}`);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <label>Price</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
        {/* More fields */}
        <button className="save-btn" onClick={handleSave}>Save</button>
<button className="cancel-btn" onClick={onClose}>Cancel</button>

      </div>
    </div>
  );
};

export default ProductEditModal;
