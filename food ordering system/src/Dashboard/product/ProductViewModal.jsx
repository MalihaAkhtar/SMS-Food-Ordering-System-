import React  from 'react';
import './Modal.css'
const ProductViewModal = ({ product, onClose }) => (
  <div className="modal-backdrop">
    <div className="modal-content">
      <h2>View Product</h2>
      <p><b>Name:</b> {product.name}</p>
      <p><b>Category:</b> {product.category}</p>
      <p><b>Price:</b> {product.price}</p>
      <button className="close-btn" onClick={onClose}>Cancel</button>
    </div>
  </div>
);
export default ProductViewModal;