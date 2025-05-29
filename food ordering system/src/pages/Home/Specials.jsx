// Specials.jsx
import React from 'react';
import './Specials.css';
import pancakesImg from '../../assets/buttermilk_pancakes.jpg';
import beefImg from '../../assets/beff_bourguignon.jpg';
import buldakImg from '../../assets/buldak.jpg';
import { useNavigate } from 'react-router-dom';

function Specials() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'BUTTERMILK PANCAKES',
      description: 'Fluffy pancakes with maple syrup and butter.',
      longDescription: `Our Buttermilk Pancakes are golden, fluffy, and stacked high. 
        They’re made fresh with rich buttermilk and topped with creamy butter 
        and warm maple syrup. A perfect treat for breakfast lovers.`,
      productHighlights: [
        {
          name: 'Blueberry Pancakes',
          description: 'Soft pancakes filled with juicy blueberries and a hint of lemon zest.',
        },
        {
          name: 'Maple Syrup Topping',
          description: 'Premium quality Canadian maple syrup drizzled generously.',
        },
      ],
      image: pancakesImg,
      price: '350',
      type: 'Dessert',
      cuisine: 'American',
      meat: 'None'
    },
    {
      title: 'BEEF BOURGUIGNON',
      description: 'Classic French-style beef stew with fresh seasonal vegetables.',
      longDescription: `Beef Bourguignon is a rich and hearty French stew made with tender beef 
        chunks slowly braised in red wine, beef stock, and aromatic herbs. Served with carrots, 
        mushrooms, and pearl onions for a luxurious comfort dish.`,
      productHighlights: [
        {
          name: 'Slow-Braised Beef',
          description: 'Cooked for hours to achieve a melt-in-your-mouth texture.',
        },
        {
          name: 'Red Wine Sauce',
          description: 'A deep, flavorful sauce made with Burgundy wine.',
        },
      ],
      image: beefImg,
      price: '1200',
      type: 'Main Course',
      cuisine: 'French',
      meat: 'Beef'
    },
    {
      title: 'BULDAK',
      description: 'Spicy Korean fried chicken with chili sauce.',
      longDescription: `Buldak, also known as fire chicken, is a bold Korean dish made with 
        crispy fried chicken glazed in a fiery gochujang-based sauce. It's hot, flavorful, and addictive.`,
      productHighlights: [
        {
          name: 'Crispy Chicken',
          description: 'Double-fried for extra crunch.',
        },
        {
          name: 'Gochujang Sauce',
          description: 'Made from fermented chili paste, soy sauce, and garlic.',
        },
      ],
      image: buldakImg,
      price: '800',
      type: 'Main Course',
      cuisine: 'Korean',
      meat: 'Chicken'
    },
  ];
  

  return (
    <section className="specials-section">
      <p className="sub-heading">Special Menu</p>
      <h2 className="specials-heading">Today’s Special</h2>
      <p className="description">
        Special menu oftenly comes different everyday, <br />
        this is our special food for today
      </p>

      <div className="menu-cards">
        {menuItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.image} alt={item.title} className="food-img" />
            <h3>{item.title}</h3>
            <p className="card-description">{item.description}</p>
            <button 
              className="special-btn"
              onClick={() => navigate("/Placeorder", { state: item })}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;
