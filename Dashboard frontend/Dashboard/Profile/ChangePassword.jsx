import React, { useState } from 'react';
import './ProfilePages.css';

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (form.newPassword.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    alert('Password changed successfully!');
    // You can integrate API call here
  };

  return (
    <div className="profile-content">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Current Password
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
            placeholder="Enter current password"
          />
        </label>

        <label>
          New Password
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
          />
        </label>

        <label>
          Confirm New Password
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-enter new password"
          />
        </label>

        <button type="submit" className="btn-primary">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
