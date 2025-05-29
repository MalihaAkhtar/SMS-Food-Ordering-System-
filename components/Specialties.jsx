import React, { useState } from 'react';
import './Specialities.css';

import biryaniImg from '../assets/biryani.jpg';
import  NahariImg from '../assets/Nihari.jpg';
import  seekhImg from '../assets/seekh kabab.jpg';
import  butterImg from '../assets/butter chicken.jpg';
import  maslaImg from '../assets/masla dosa.jpg';
import  paneerImg from '../assets/paneer tikka.jpg';
import  MargheritaImg from '../assets/Margherita Pizza.jpg';
import  pastaImg from '../assets/Pasta Carbonara.jpg';
import  TiramisuImg from '../assets/Tiramisu.jpg';
import  sweetImg from '../assets/Sweet and Sour Chicken.jpg';
import ChowImg from '../assets/Chow Mein.jpg';
import DumplingsImg from '../assets/Dumplings.jpg';
import PadImg from '../assets/Pad Thai.jpg';
import GreenImg from '../assets/Green Curry.jpg';
import TomImg from '../assets/Tom Yum Soup.jpg';
import CroissantImg from '../assets/Croissant.jpg';
import BeefImg from '../assets/Beef Bourguignon.jpg';
import CrèmeImg from '../assets/Crème Brûlée.jpg';
import SushiImg from '../assets/Sushi.jpg'
import RamenImg from '../assets/Ramen.jpg'
import TumpuraImg from '../assets/Tumpura.jpg'
const cuisineFilters = ['Pakistani', 'Indian', 'Italian', 'Chinese', 'Thai', 'French', 'Japanese'];

const menuItems = {
  Pakistani: [
    {
      title: 'Chicken Biryani',
      description: 'Spicy basmati rice cooked with tender chicken and aromatic spices.',
      price: 'PKR 450',
      image: biryaniImg,
    },
    {
      title: 'Nihari',
      description: 'Slow-cooked beef stew served with naan and green chilies.',
      price: 'PKR 500',
      image: NahariImg,
    },
    {
      title: 'Seekh Kebabs',
      description: 'Grilled minced meat skewers seasoned with traditional spices.',
      price: 'PKR 400',
      image: seekhImg,
    },
  ],
  Indian: [
    {
      title: 'Butter Chicken',
      description: 'Creamy tomato-based chicken curry served with naan.',
      price: 'INR 380',
      image:  butterImg,
    },
    {
      title: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato mixture.',
      price: 'INR 200',
      image:  maslaImg,
    },
    {
      title: 'Paneer Tikka',
      description: 'Grilled cottage cheese cubes marinated in spicy yogurt.',
      price: 'INR 250',
      image:  paneerImg,
    },
  ],
  Italian: [
    {
      title: 'Margherita Pizza',
      description: 'Classic pizza with mozzarella, tomato sauce, and fresh basil.',
      price: '$10',
      image: MargheritaImg,
    },
    {
      title: 'Pasta Carbonara',
      description: 'Creamy pasta with pancetta, egg, and parmesan cheese.',
      price: '$12',
      image: pastaImg,
    },
    {
      title: 'Tiramisu',
      description: 'Coffee-flavored dessert with mascarpone cheese.',
      price: '$8',
      image: TiramisuImg,
    },
  ],
  Chinese: [
    {
      title: 'Sweet and Sour Chicken',
      description: 'Fried chicken pieces tossed in tangy sauce with pineapple.',
      price: '$9',
      image: sweetImg,
    },
    {
      title: 'Chow Mein',
      description: 'Stir-fried noodles with vegetables and soy sauce.',
      price: '$8',
      image: ChowImg,
    },
    {
      title: 'Dumplings',
      description: 'Boiled or fried dough filled with meat and veggies.',
      price: '$6',
      image: DumplingsImg,
    },
  ],
  Thai: [
    {
      title: 'Pad Thai',
      description: 'Rice noodles stir-fried with eggs, tofu, shrimp, and tamarind.',
      price: '$10',
      image: PadImg,
    },
    {
      title: 'Green Curry',
      description: 'Spicy coconut curry with vegetables and chicken.',
      price: '$11',
      image:GreenImg ,
    },
    {
      title: 'Tom Yum Soup',
      description: 'Hot and sour Thai soup with shrimp and mushrooms.',
      price: '$9',
      image: TomImg ,
    },
  ],
  French: [
    {
      title: 'Croissant',
      description: 'Flaky, buttery pastry perfect for breakfast.',
      price: '€3',
      image:CroissantImg ,
    },
    {
      title: 'Beef Bourguignon',
      description: 'Beef stew braised in red wine with mushrooms and onions.',
      price: '€14',
      image: BeefImg,
    },
    {
      title: 'Crème Brûlée',
      description: 'Custard dessert topped with caramelized sugar.',
      price: '€6',
      image:CrèmeImg ,
    },
  ],
  Japanese: [
    {
      title: 'Sushi',
      description: 'Vinegared rice rolled with raw fish and vegetables.',
      price: '¥1200',
      image: SushiImg,
    },
    {
      title: 'Ramen',
      description: 'Hot noodle soup with pork, egg, and vegetables.',
      price: '¥1000',
      image: RamenImg,
    },
    {
      title: 'Tempura',
      description: 'Crispy deep-fried seafood and vegetables.',
      price: '¥950',
      image: TumpuraImg,
    },
  ]
};

function Specialities() {
  const [selectedFilter, setSelectedFilter] = useState('Pakistani');

  return (
    <section className="specialities-section">
      <div className="specialities-header">
        <p className="specialities-top-text">Quality Food For You</p>
        <h2 className="specialities-heading">Our Specialities</h2>
        <p className="specialities-subtext">
          Authentic food from our restaurant served <br /> with high quality ingredients
        </p>
      </div>

      <div className="specialities-filters">
        {cuisineFilters.map((cuisine) => (
          <button
            key={cuisine}
            className={`filter-btn ${selectedFilter === cuisine ? 'active' : ''}`}
            onClick={() => setSelectedFilter(cuisine)}
          >
            {cuisine}
          </button>
        ))}
      </div>

      <div className="specialities-menu">
        {menuItems[selectedFilter].map((item, index) => (
          <div className={`speciality-item ${index % 2 === 1 ? 'reverse' : ''}`} key={index}>
            <img src={item.image} alt={item.title} className="speciality-img" />
            <div className="speciality-text">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
              <button
      className="order-btn"
      onClick={() => alert(`Order placed for ${item.title}`)}
    >
      Place Order
    </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specialities;
