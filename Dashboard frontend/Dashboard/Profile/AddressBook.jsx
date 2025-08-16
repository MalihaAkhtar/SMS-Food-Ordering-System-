import React, { useState } from 'react';
import './ProfilePages.css';

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', address: '123 Main St, Karachi' },
    { id: 2, label: 'Office', address: '456 Business Rd, Karachi' },
  ]);

  const [newAddress, setNewAddress] = useState({ label: '', address: '' });

  const handleChange = (e) =>
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.label || !newAddress.address) {
      alert('Please fill in both fields');
      return;
    }
    setAddresses([
      ...addresses,
      { ...newAddress, id: Date.now() },
    ]);
    setNewAddress({ label: '', address: '' });
  };

  const handleDelete = (id) =>
    setAddresses(addresses.filter((a) => a.id !== id));

  return (
    <div className="profile-content">
      <h1>Address Book</h1>

      <form onSubmit={handleAddAddress} className="profile-form">
        <label>
          Label (e.g., Home, Office)
          <input
            type="text"
            name="label"
            value={newAddress.label}
            onChange={handleChange}
            placeholder="Enter label"
            required
          />
        </label>
        <label>
          Address
          <input
            type="text"
            name="address"
            value={newAddress.address}
            onChange={handleChange}
            placeholder="Enter address"
            required
          />
        </label>
        <button type="submit" className="btn-primary">Add Address</button>
      </form>

      <ul className="address-list">
        {addresses.map(({ id, label, address }) => (
          <li key={id} className="address-item">
            <div>
              <strong>{label}:</strong> {address}
            </div>
            <button onClick={() => handleDelete(id)} className="btn-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressBook;
