import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './ProductDetails';
import DescriptionSection from './DescriptionSection';
import CustomerReviews from './CustomerReviews';
import RecommendedProducts from './RecommendedProducts';
import './PlaceOrder.css';
import { useAuth } from '../../pages/Context/AuthContext';
const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;
const { user } = useAuth();
  if (!product) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No product selected.</p>;
  }

  
 const handlePlaceOrder = async () => {
  
  try {
    const res = await axios.post('http://localhost:5000/api/orders', {
     user_id: user.uid,
      user_name: 'Maliha', // Or get from logged-in user
      user_email: 'maliha@example.com', // Or from user state
      country: 'Pakistan',
      address: '123 Street, City',
      product_title: product.title,
      product_price: Number(product.price.toString().replace(/[^0-9.]/g, '')),
      product_quantity: 1,
      product_description: product.longDescription,
      product_image: product.image,
      payment_method: 'COD',
      payment_status: 'Pending'
    });

    console.log('Order saved:', res.data);

    const cartItem = { ...product, quantity: 1 };
    navigate('/checkout', { state: { cartItems: [cartItem] } });

  } catch (err) {
    console.error("Error placing order:", err);
    alert('Failed to place order');
  }
};

  return (
    <div className="place-order-page">
      <ProductDetails product={product} />
      <DescriptionSection
        foodName={product.title}
        description={product.longDescription}
        productHighlights={product.productHighlights}
      />
      <CustomerReviews />
      <RecommendedProducts />

      {/* ✅ Order Button */}
      <div className="order-button-wrapper">
        <button className="order-button" onClick={handlePlaceOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
