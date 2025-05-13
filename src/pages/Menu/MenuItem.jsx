import React from 'react';
import './Menu.css';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ image, title, description, price }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/placeorder', {
      state: {
        image,
        title,
        description,
        price
      }
    });
  };

  return (
    <div className="menu-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={image} alt={title} className="menu-item-img" />
      <div className="menu-item-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="menu-item-price">${price}</div>
    </div>
  );
};

export default MenuItem;
