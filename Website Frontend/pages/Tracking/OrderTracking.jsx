import React from "react";
import "./OrderTracking.css";

const steps = [
  "Order Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered"
];

const OrderTracking = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="tracking-container">
      {steps.map((step, index) => (
        <div key={index} className={`step ${index <= currentIndex ? "active" : ""}`}>
          <div className="circle">{index + 1}</div>
          <div className="label">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderTracking;
