import React from 'react';
import { NavLink } from 'react-router-dom';
import './ProfileSidebar.css';

const ProfileSidebar = () => {
  return (
    <div className="profile-sidebar">
      <h2>Profile</h2>
      <ul>
        <li><NavLink to="/dashboard/profile" end>View Profile</NavLink></li>
        <li><NavLink to="/dashboard/profile/edit">Edit Profile</NavLink></li>
        <li><NavLink to="/dashboard/profile/change-password">Change Password</NavLink></li>
        <li><NavLink to="/dashboard/profile/address-book">Address Book</NavLink></li>
        <li><NavLink to="/dashboard/profile/payment-methods">Payment Methods</NavLink></li>
        <li><NavLink to="/dashboard/profile/order-history">Order History</NavLink></li>
       <li><NavLink to="/dashboard/profile/notifications">Notifications</NavLink></li>
      </ul>
      <footer>&copy; 2025</footer>
    </div>
  );
};

export default ProfileSidebar;
