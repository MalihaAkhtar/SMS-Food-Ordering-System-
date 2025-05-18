import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  MessageCircle,
} from 'lucide-react';

import './Sidebar.css';  // <-- CSS import yahan ho raha hai

const Sidebar = () => {
  const menu = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/dashboard/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/dashboard/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Users', path: '/dashboard/users', icon: <Users size={20} /> },
    { name: 'Payments', path: '/dashboard/payments', icon: <CreditCard size={20} /> },
    { name: 'Feedback', path: '/dashboard/feedback', icon: <MessageCircle size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <h2>FoodAdmin</h2>
      <ul>
        {menu.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <footer>© 2025 FoodAdmin</footer>
    </aside>
  );
};

export default Sidebar;
