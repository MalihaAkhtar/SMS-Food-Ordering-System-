import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css';
import creditIcon from '../../assets/credit-icon.png';
import logo from '../../assets/Logo 1.png';
import axios from 'axios';

const CheckoutPage = () => {
  const location = useLocation();
  const cartItems = location?.state?.cartItems || [];

  const [selectedCountry, setSelectedCountry] = useState("Pakistan");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const shippingCost = 17.45;
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  const handlePayment = async () => {
    const fullName = `${firstName} ${lastName}`;

    try {
      // Send each item in the cart to the backend
      for (const item of cartItems) {
      await axios.post("http://localhost:5000/api/checkout", {
  userName: fullName,
  userEmail: email,
  country: selectedCountry,
  address: `${address}, ${city}, ${postalCode}`,
  productTitle: item.name,          // yahan
  productPrice: item.price,         // yahan
  productQuantity: item.quantity,   // yahan
  productDescription: item.desc,    // yahan
  productImage: item.image,         // yahan
  paymentMethod: "Credit Card",
  paymentStatus: "Paid"
});

      }

      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Failed to complete checkout.");
    }
  };

  if (cartItems.length === 0) {
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
        <div className="logo2">
      <img src={logo} alt="SMS Logo" className="logo-image2" /></div>

        <h2 className="section-title">Contact</h2>
        <input
          type="text"
          placeholder="Email or mobile number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="checkbox-label">
          <input type="checkbox" id="news-offers" />
          <label htmlFor="news-offers">Email me with news and offers</label>
        </div>

        <h2 className="section-title">Delivery</h2>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option>Pakistan</option>
          <option>USA</option>
          <option>UK</option>
          <option>Canada</option>
        </select>

        <div className="input-row">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="input-row">
          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            placeholder="Postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
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
      <p>{item.desc}</p>
    </div>
    <div className="item-quantity">
      <input type="number" min="1" value={item.quantity} readOnly />
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
