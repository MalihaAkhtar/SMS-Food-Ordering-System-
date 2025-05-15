import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import DescriptionSection from './DescriptionSection';
import CustomerReviews from './CustomerReviews';
import RecommendedProducts from './RecommendedProducts';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state;

  if (!product) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No product selected.</p>;
  }

  
    const cartItem = {
      ...product,
      quantity: 1, // Default quantity
    };
    navigate('/checkout', { state: { cartItems: [cartItem] } });
  

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

      
    </div>
  );
};
export default PlaceOrder;
