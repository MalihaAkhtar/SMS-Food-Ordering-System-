import React from 'react';
import './Specials.css';

import pancakesImg from '../assets/buttermilk_pancakes.jpg';
import beefImg from '../assets/beff_bourguignon.jpg';
import buldakImg from '../assets/buldak.jpg';
import starImg from '../assets/star.png'; // use your correct star path

function Specials() {
  const menuItems = [
    {
      title: 'BUTTERMILK PANCAKES',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus.',
      image: pancakesImg,
    },
    {
      title: 'BEEF BOURGUIGNON',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus.',
      image: beefImg,
    },
    {
      title: 'BULDAK',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut imperdiet lectus.',
      image: buldakImg,
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
            <img src={starImg} alt="rating" className="star-rating" />
            <button className="order-btn">Order Now</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specials;
