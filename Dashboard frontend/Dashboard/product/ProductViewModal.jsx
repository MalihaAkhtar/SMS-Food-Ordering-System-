import React from 'react';
import Imagesmap from './imagemap';  // adjust path as needed
import './Modal.css';

const ProductViewModal = ({ product, onClose }) => {
  const getFileNameFromUrl = (url) => {
    if (!url) return '';
    return url.substring(url.lastIndexOf('/') + 1);
  };

  const fileName = getFileNameFromUrl(product.image);

  // Image source priority:
  // 1. Imagesmap local image
  // 2. Full URL if product.image starts with http/https
  // 3. Backend uploads folder URL
  // 4. null if no image

  let imageSrc = null;
  if (Imagesmap[fileName]) {
    imageSrc = Imagesmap[fileName];
  } else if (product.image && (product.image.startsWith('http://') || product.image.startsWith('https://'))) {
    imageSrc = product.image;
  } else if (product.image && product.image.trim() !== '') {
    imageSrc = `http://localhost:5001/uploads/${product.image}`;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ position: 'relative' }}>
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
          title="Close"
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          &times;
        </button>

        <h2>Product Details</h2>

        {imageSrc ? (
          <div className="product-image-wrapper">
            <img
              src={imageSrc}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/placeholder-image.png'; // fallback placeholder image path
              }}
            />
          </div>
        ) : (
          <p>No image available.</p>
        )}

        <div className="product-detail"><b>Name:</b> {product.name}</div>
        <div className="product-detail"><b>Category:</b> {product.category}</div>
        <div className="product-detail">
          <b>Price:</b> {product.price ? Number(product.price).toFixed(2) : 'N/A'}
        </div>
        <div className="product-detail"><b>Status:</b> {product.status || 'N/A'}</div>

      </div>
    </div>
  );
};

export default ProductViewModal;
