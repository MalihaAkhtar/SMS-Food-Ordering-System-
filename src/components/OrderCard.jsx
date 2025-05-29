import React, { useState } from 'react';
import './OrderCard.css';

const OrderCard = ({ id, date, status, items, total, image }) => {
  const [trackingDetails, setTrackingDetails] = useState(null);
  const [showTracking, setShowTracking] = useState(false);

  const fetchTrackingDetails = async () => {
    const trackingData = [
      {
        status: "Preparing",
        location: "Kitchen",
        time: "2025-04-24 10:00 AM"
      },
      {
        status: "Out for Delivery",
        location: "Warehouse",
        time: "2025-04-24 2:00 PM"
      },
      {
        status: "Delivered",
        location: "Customer's Address",
        time: "2025-04-24 5:00 PM"
      }
    ];

    const filtered = trackingData.filter(entry => entry.status === status);
    setTrackingDetails(filtered);
    setShowTracking(true);
  };

  const statusClass = status.toLowerCase().replace(/\s+/g, '-');
  const showTrackButton = status === 'Preparing' || status === 'Out for Delivery' || status === 'Delivered';

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
          <span className={`status ${statusClass}`}>{status}</span>
          <span className="total"><strong>Total:</strong> ${total}</span>
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
                  <strong>Location:</strong> {entry.location}<br />
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
