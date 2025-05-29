/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state;

  const [currentFood, setCurrentFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (item && (!currentFood || currentFood.title !== item.title)) {
      setCurrentFood(item);
      setQuantity(1);
    }
  }, [item, currentFood]);

  if (!currentFood) return <p>Loading...</p>;

  const { title, description, image, price, type, cuisine, meat } = currentFood;

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: window.location.href,
      }).then(() => console.log('Shared successfully!'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // 👉 Add to Cart Handler
  const handleAddToProduct = () => {
    const cartItem = { ...currentFood, quantity };
    navigate('/AddToProduct', { state: cartItem });
  };

  // 👉 Add to Wishlist Handler
  const handleAddToWishlist = () => {
    navigate('/AddToWishlist', { state: currentFood });
  };
  const handlePayment = () => {
    const cartItem = { ...currentFood, quantity };
    navigate('/payment', { state: { cartItems: [cartItem] } });
  };

  return (
    <section className="product-details">
      <div className="left">
        <img src={image} alt={title} className="main-image" />
        <div className="share-section">
          <button className="share-btn" onClick={handleShare}>🔗 Share</button>
        </div>
        <div className="delivery-time">
          <p>🚚 Estimated Delivery: <strong>30-45 minutes</strong></p>
        </div>
      </div>

      <div className="right">
        <h2>{title}</h2>
        <p>{description}</p>

        <div className="meta">
          <p>Price: <strong>{price} PKR</strong></p>
          <p>Type: {type}</p>
          <p>Cuisine: {cuisine}</p>
          <p>Meat: {meat}</p>

          <div className="quantity-container">
            <span>Quantity:</span>
            <div className="qty-controls">
              <button className="qty-btn" onClick={decreaseQty}>-</button>
              <div className="qty-number-box">
                <span className="qty-number">{quantity}</span>
              </div>
              <button className="qty-btn" onClick={increaseQty}>+</button>
            </div>
          </div>

          <div className="buttons-container">
            <div className="inline-buttons">
              <button className="btn yellow-btn" onClick={handleAddToProduct}>Add to Cart</button>
              <button className="btn yellow-btn" onClick={handleAddToWishlist}>Add to Wishlist</button>
            </div>
            <button className="btn yellow-btn full-width" onClick={handlePayment}>Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
