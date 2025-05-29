import React from 'react';
import OrderCard from '../../components/OrderCard';
import './Orders.css';
import biryaniImg from '../../assets/biryani.jpg';
import  NahariImg from '../../assets/Nihari.jpg';
import  seekhImg from '../../assets/seekh kabab.jpg';

const orders = [
  {
    id: 'ORD123',
    date: '2025-04-24',
    status: 'Delivered',
    items: ['Chicken biryani'],
    total: '14.98',
    image: biryaniImg,
  },
  {
    id: 'ORD124',
    date: '2025-04-25',
    status: 'Preparing',
    items: ['Nehari'],
    total: '8.99',
    image: NahariImg,
  },
  {
    id: 'ORD125',
    date: '2025-04-25',
    status: 'Out for Delivery',
    items: ['Seekh'],
    total: '15.98',
    image: seekhImg,
  },
];

const MyOrders = () => {
  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <OrderCard key={order.id} {...order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
