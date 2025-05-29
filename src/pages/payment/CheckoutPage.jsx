import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css';
import creditIcon from '../../assets/credit-icon.png';


const CheckoutPage = () => {
  const location = useLocation();

  // ✅ Safe fallback if cartItems are not passed in navigation
  const cartItems = location?.state?.cartItems || [];

  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const shippingCost = 17.45;
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;
  const total = subtotal + shippingCost;

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 3000);
  };

  // ✅ If no cart items, show a message
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <h2>No items selected for checkout.</h2>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="checkout-left">
      <div className="logo">🍽️ Zumi</div>


        <h2 className="section-title">Contact</h2>
        <input type="text" placeholder="Email or mobile number" />
        <div className="checkbox-label">
          <input type="checkbox" id="news-offers" />
          <label htmlFor="news-offers">Email me with news and offers</label>
        </div>

        <h2 className="section-title">Delivery</h2>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option>Pakistan</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
        </select>
        <div className="input-row">
          <input placeholder="First name (optional)" />
          <input placeholder="Last name" />
        </div>
        <input placeholder="Address" />
        <input placeholder="Apartment, suite, etc. (optional)" />
        <div className="input-row">
          <input placeholder="City" />
          <input placeholder="Postal code (optional)" />
        </div>
        <div className="checkbox-label">
          <input type="checkbox" id="save-info" />
          <label htmlFor="save-info">Save this information for next time</label>
        </div>

        <h2 className="section-title">Shipping method</h2>
        <div className="shipping-box">
          <span>Standard</span>
          <span>${shippingCost}</span>
        </div>

        <h2 className="section-title">Payment</h2>
        <p className="section-desc">All transactions are secure and encrypted.</p>

        <div className="credit-card-box">
          <div className="credit-card-header">
            <span>Credit card</span>
            <img src={creditIcon} alt="credit-icon" className="credit-icon" />
          </div>
          <div className="input-with-icon">
            <input placeholder="Card number" />
            <span className="icon-lock">🔒</span>
          </div>

          <div className="input-row">
            <input placeholder="Expiration date (MM/YY)" />
            <input placeholder="Security code" />
          </div>
          <input placeholder="Name on card" />
          <div className="checkbox-label">
            <input type="checkbox" id="same-address" />
            <label htmlFor="same-address" className="black-text">
              Use shipping address as billing address
            </label>
          </div>
        </div>

        <button className="pay-button" onClick={handlePayment}>Pay now</button>
        {paymentSuccess && <div className="payment-notification">Payment Successful!</div>}
      </div>

      {/* Right Section */}
      <div className="checkout-right">
        {cartItems.map((item, index) => (
          <div className="order-item" key={index}>
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <div className="item-quantity">
              <input
                type="number"
                min="1"
                value={item.quantity}
                readOnly
              />
            </div>
            <span className="item-price">{item.price * item.quantity} PKR</span>
          </div>
        ))}

        <div className="order-totals">
          <div>
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} PKR</span>
          </div>
          <div>
            <span>Shipping</span>
            <span>{shippingCost.toFixed(2)} PKR</span>
          </div>
          <div className="total-final">
            <span>Total</span>
            <span>{total.toFixed(2)} PKR</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
