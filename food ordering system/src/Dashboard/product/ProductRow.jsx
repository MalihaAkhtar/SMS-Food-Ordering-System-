import React, { useState } from 'react';
import ProductViewModal from './ProductViewModal';
import ProductEditModal from './ProductEditModal';
import './ProductTable.css';

const ProductRow = ({ product }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleView = () => {
    setOpenMenu(false);
    setViewModalOpen(true);
  };

  const handleEdit = () => {
    setOpenMenu(false);
    setEditModalOpen(true);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      alert(`Deleted product: ${product.name}`);
      // Add your actual delete logic here
    }
  };

  return (
    <>
      <tr className="product-row" style={{ position: 'relative' }}>
        <td>
          <img src={product.image} alt={product.name} className="product-img" />
        </td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>
          <span className={`status ${product.status === 'Available' ? 'available' : 'unavailable'}`}>
            {product.status}
          </span>
        </td>
        <td style={{ position: 'relative' }}>
          <button
            className="action-btn"
            onClick={() => setOpenMenu(!openMenu)}
            aria-label="Open actions menu"
          >
            ⋯
          </button>
          {openMenu && (
            <div className="action-dropdown">
              <button onClick={handleView}>View</button>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </td>
      </tr>

      {viewModalOpen && (
        <ProductViewModal product={product} onClose={() => setViewModalOpen(false)} />
      )}

      {editModalOpen && (
        <ProductEditModal product={product} onClose={() => setEditModalOpen(false)} />
      )}
    </>
  );
};

export default ProductRow;
