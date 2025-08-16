import React, { useState } from 'react';
import './OrderCard.css';

const OrderCard = ({ id, date, status, items, total, image }) => {
  const [trackingDetails, /*setTrackingDetails*/] = useState(null);
  const [showTracking, /*setShowTracking*/] = useState(false);

const fetchTrackingDetails = async () => {
  console.log("Tracking order id:", id);
  try {
    const res = await fetch(`http://localhost:5000/api/order-status/${id.replace('ORD', '')}`);
    console.log("Response status:", res.status);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Tracking data:", data);
    // ... rest unchanged
  } catch (err) {
    console.error('Error fetching tracking status:', err);
  }
};

  const statusClass = status ? status.toLowerCase().replace(/\s+/g, '-') : '';

  let deliveryMessage = '';
  if (status === 'Delivered') {
    deliveryMessage = '✅ Your order has been delivered.';
  } else if (status === 'Out for Delivery' || status === 'Shipped' || status === 'Processing') {
    deliveryMessage = '🚚 Your order is on the way.';
  } else {
    deliveryMessage = '⌛ Your order is pending.';
  }

  const showTrackButton = status !== 'Delivered';

  return (
    <div className="order-card">
      <div className="card-left">
        <img src={image} alt="Food Item" className="order-img" />
      </div>

      <div className="card-right">
        <div className="order-header">
          <span><strong>Order ID:</strong> {id}</span>
          <span className="order-date"><strong>Date:</strong> {date}</span>
        </div>

        <div className="order-items">
          <strong>Items:</strong> {items.join(', ')}
        </div>

        <div className="order-footer">
          <span className={`status ${statusClass}`}>{status || 'Pending'}</span>
          <span className="total"><strong>Total:</strong> ${total}</span>
        </div>

        <div className="delivery-message">
          <em>{deliveryMessage}</em>
        </div>

        {showTrackButton && (
          <button className="order-track-btn" onClick={fetchTrackingDetails}>
            Track Order
          </button>
        )}

       {showTracking && trackingDetails && (
  <div className="order-tracking-details">
    <h3>Order Tracking</h3>
    <ul>
      {trackingDetails.map((entry, index) => (
        <li key={index}>
          <strong>Status:</strong> {entry.status}<br />
          <strong>Time:</strong> {entry.time}
        </li>
      ))}
    </ul>
  </div>
)}
      </div>
    </div>
  );
};

export default OrderCard;
