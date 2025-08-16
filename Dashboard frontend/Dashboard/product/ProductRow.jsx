import React, { useState } from 'react';
import Imagesmap from './imagemap'; // Local mapping object
import './ProductTable.css';

const getFileNameFromUrl = (url) => {
  if (!url) return '';
  return url.substring(url.lastIndexOf('/') + 1);
};

const ProductRow = ({ product, onView, onEdit, onDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const fileName = getFileNameFromUrl(product.image);

  let imgSrc = null;

  if (Imagesmap[fileName]) {
    imgSrc = Imagesmap[fileName];
  } else if (
    product.image &&
    (product.image.startsWith('http://') || product.image.startsWith('https://'))
  ) {
    imgSrc = product.image;
  } else if (product.image && product.image.trim() !== '') {
    imgSrc = `http://localhost:5001/uploads/${product.image}`;
  }

  return (
    <tr className="product-row" style={{ position: 'relative' }}>
      <td>
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="product-img"
            style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.png'; // Apni placeholder image ka path daalain
            }}
          />
        ) : (
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 6,
              backgroundColor: '#eee',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#888',
              fontSize: 12,
            }}
          >
            No Image
          </div>
        )}
      </td>
      <td>{product.name}</td>
      <td>{product.category && product.category.trim() !== '' ? product.category : 'N/A'}</td>
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
            <button
              onClick={() => {
                setOpenMenu(false);
                onView(product);
              }}
            >
              View
            </button>
            <button
              onClick={() => {
                setOpenMenu(false);
                onEdit(product);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                setOpenMenu(false);
                onDelete(product.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default ProductRow;
