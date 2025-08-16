import React, { useState } from 'react';
import ProductRow from './ProductRow';
import ProductViewModal from './ProductViewModal';
import ProductEditModal from './ProductEditModal';
import './ProductTable.css';

const ProductTable = ({ products, onDelete, onRefresh }) => {
  const [viewProduct, setViewProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);

  if (products.length === 0) {
    return <p style={{ color: 'white', padding: '20px' }}>No products found.</p>;
  }

  const closeModals = () => {
    setViewProduct(null);
    setEditProduct(null);
  };

  // Callback when product edit modal successfully updates
  const handleUpdate = () => {
    if (onRefresh) onRefresh();
    closeModals();
  };

  return (
    <div className="product-table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <ProductRow
              key={product.id}
              product={product}
              onView={setViewProduct}
              onEdit={setEditProduct}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>

      {viewProduct && <ProductViewModal product={viewProduct} onClose={closeModals} />}
      {editProduct && (
        <ProductEditModal
          product={editProduct}
          onClose={closeModals}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ProductTable;
