import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../../components/OrderCard';
import './Orders.css';
import { useAuth } from '../../pages/Context/AuthContext'; // adjust path if needed

const MyOrders = () => {
  const { user } = useAuth(); // Get current logged-in user
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


 useEffect(() => {
   // 👈 check this in your browser console

  if (!user?.uid) return;
  
  axios
    .get(`http://localhost:5000/api/orders/${user.uid}`)
    
    .then((response) => {
      setOrders(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching user orders:', error);
      setLoading(false);
    });
}, [user]);


  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              id={`ORD${order.id}`}
              date={new Date(order.created_at).toLocaleDateString()}
              status={order.status || 'Pending'} // you can update status handling here
              items={[order.product_title]}
              total={order.product_price}
              image={order.product_image}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
