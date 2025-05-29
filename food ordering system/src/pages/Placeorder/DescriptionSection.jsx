import React from 'react';
import './DescriptionSection.css'; // CSS make sure yahan maujood hai

const DescriptionSection = ({ description, productHighlights = [] }) => {
  return (
    <div className="description-wrapper">
      <div className="description-heading">Description</div>
      <div className="description-box">
        <p className="description-content">{description}</p>
        <div className="product-highlights">
          <strong>Important Yummi Products:</strong>
          <ul>
            {productHighlights.map((highlight, index) => (
              <li key={index}>
                <strong>{highlight.name}:</strong> {highlight.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DescriptionSection;
