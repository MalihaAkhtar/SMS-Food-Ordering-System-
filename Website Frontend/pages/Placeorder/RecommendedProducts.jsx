import React from 'react';
import './RecomendedProducts.css';
import pancakeImg from '../../assets/Pancake.jpg';
import crabImg from '../../assets/Spacy-Fresh-Crab.png';
import buldakImg from '../../assets/Buldak.png';
import { useNavigate } from 'react-router-dom';
const products = [
  {
    title: "BUTTERMILK PANCAKES",
    price: "1299.PKR",
    image: pancakeImg,
  },
  {
    title: "BEEF BOURGUIGNON",
    price: "900.PKR",
    image: crabImg,
  },
  {
    title: "BULDAK",
    price: "878.PKR",
    image: buldakImg,
  }
];

const RecommendedProducts = () => {
    const navigate = useNavigate();
  return (
    <section className="recommended-section">
      <h2 className="recommended-heading">Recommended products</h2>
      <div className="recommended-grid">
        {products.map((product, index) => (
          <div key={index} className="recommended-card">
            <img src={product.image} alt={product.title} className="recommended-img" />
            <div className="recommended-content">
              <h3 className="recommended-title">{product.title}</h3>
              <p className="recommended-price">{product.price}</p>
              <div className="recommended-stars">★★★★★</div>
              <button className="recommended-btn" onClick={() => navigate("/Placeorder")}>
          Order Now
        </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecommendedProducts;
