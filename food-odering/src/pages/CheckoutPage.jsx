import React from 'react';
import '../styles/checkout.css';
import chickenPopcorn from '../assets/chicken-popcorn.jpg';
import creditIcon from '../assets/credit-icon.png';  // Adjust path based on your file structure


const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      {/* Left Section */}
      <div className="checkout-left">
        <img src="/assets/logo.png" alt="Yummy Tummy" className="logo" />

        {/* Contact */}
        <h2 className="section-title">Contact</h2>
        <input type="text" placeholder="Email or mobile number" />
        <div className="checkbox-label">
          <input type="checkbox" id="news-offers" />
          <label htmlFor="news-offers">Email me with news and offers</label>
        </div>

        {/* Delivery */}
        <h2 className="section-title">Delivery</h2>
        <select>
          <option>Pakistan</option>
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

        {/* Shipping Method */}
        <h2 className="section-title">Shipping method</h2>
        <div className="shipping-box">
          <span>Standard</span>
          <span>$17.45</span>
        </div>

        {/* Payment */}
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
            <div className="input-with-icon">
              <input placeholder="Expiration date (MM/YY)" />
            </div>
            <div className="input-with-icon">
              <input placeholder="Security code" />
              <span className="input-icon">❓</span>
            </div>
          </div>

          <input placeholder="Name on card" />

          {/* Use shipping address as billing address */}
          <div className="checkbox-label">
            <input type="checkbox" id="same-address" />
            <label htmlFor="same-address" className="black-text">Use shipping address as billing address</label>
          </div>
        </div>

        <button className="pay-button">Pay now</button>
      </div>

      {/* Right Section */}
      <div className="checkout-right">
        <div className="order-item">
          <img src={chickenPopcorn} alt="chicken-popcorn" />
          <div className="item-details">
            <h4>Chicken Popcorn</h4>
            <p>Non-Veg / Italian / Chicken</p>
          </div>
          <span className="item-price">PKR270.00</span>
        </div>

        <div className="order-totals">
          <div>
            <span>Subtotal</span>
            <span>PKR270.00</span>
          </div>
          <div>
            <span>Shipping</span>
            <span>PKR17.45</span>
          </div>
          <div className="total-final">
            <span>Total</span>
            <span>PKR287.45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
