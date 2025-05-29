import React, { useState } from 'react';
import './ProfilePages.css';

const PaymentMethods = () => {
  const [methods, setMethods] = useState([
    { id: 1, type: 'Credit Card', detail: '**** **** **** 1234' },
    { id: 2, type: 'PayPal', detail: 'ali.khan@example.com' },
  ]);

  const [newMethod, setNewMethod] = useState({
    type: '',
    detail: '',
  });

  const handleChange = (e) => {
    setNewMethod({ ...newMethod, [e.target.name]: e.target.value });
  };

  const handleAddMethod = (e) => {
    e.preventDefault();
    if (!newMethod.type || !newMethod.detail) {
      alert('Please provide both type and details.');
      return;
    }

    setMethods([...methods, { ...newMethod, id: Date.now() }]);
    setNewMethod({ type: '', detail: '' });
  };

  const handleDelete = (id) => {
    setMethods(methods.filter((method) => method.id !== id));
  };

  return (
    <div className="profile-content">
      <h1>Payment Methods</h1>

      <form onSubmit={handleAddMethod} className="profile-form">
        <label>
          Payment Type
          <input
            type="text"
            name="type"
            value={newMethod.type}
            onChange={handleChange}
            placeholder="e.g., Credit Card, PayPal"
            required
          />
        </label>
        <label>
          Payment Detail
          <input
            type="text"
            name="detail"
            value={newMethod.detail}
            onChange={handleChange}
            placeholder="Card number or email"
            required
          />
        </label>
        <button type="submit" className="btn-primary">Add Payment Method</button>
      </form>

      <ul className="payment-list">
        {methods.map(({ id, type, detail }) => (
          <li key={id} className="payment-item">
            <div>
              <strong>{type}:</strong> {detail}
            </div>
            <button onClick={() => handleDelete(id)} className="btn-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethods;
