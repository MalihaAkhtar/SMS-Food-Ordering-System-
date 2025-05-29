import React, { useState } from 'react';
import './Specialities.css';
import { useNavigate } from 'react-router-dom'; 
import biryaniImg from '../../assets/biryani.jpg';
import  NahariImg from '../../assets/Nihari.jpg';
import  seekhImg from '../../assets/seekh kabab.jpg';
import  butterImg from '../../assets/butter chicken.jpg';
import  maslaImg from '../../assets/masla dosa.jpg';
import  paneerImg from '../../assets/paneer tikka.jpg';
import  MargheritaImg from '../../assets/Margherita Pizza.jpg';
import  pastaImg from '../../assets/Pasta Carbonara.jpg';
import  TiramisuImg from '../../assets/Tiramisu.jpg';
import  sweetImg from '../../assets/Sweet and Sour Chicken.jpg';
import ChowImg from '../../assets/Chow Mein.jpg';
import DumplingsImg from '../../assets/Dumplings.jpg';
import PadImg from '../../assets/Pad Thai.jpg';
import GreenImg from '../../assets/Green Curry.jpg';
import TomImg from '../../assets/Tom Yum Soup.jpg';
import CroissantImg from '../../assets/Croissant.jpg';
import BeefImg from '../../assets/Beef Bourguignon.jpg';
import CrèmeImg from '../../assets/Crème Brûlée.jpg';
import SushiImg from '../../assets/Sushi.jpg'
import RamenImg from '../../assets/Ramen.jpg'
import TumpuraImg from '../../assets/Tumpura.jpg'
const cuisineFilters = ['Pakistani', 'Indian', 'Italian', 'Chinese', 'Thai', 'French', 'Japanese'];

const menuItems = {
  Pakistani: [
    {
      title: 'Chicken Biryani',
      shortDescription: 'A rich and aromatic dish made with basmati rice and succulent chicken.',
      longDescription: 'A rich and aromatic dish made with basmati rice, succulent chicken, and a blend of traditional spices like cumin, cardamom, and saffron, served with a tangy raita or salad on the side.',
      briefDescription: 'Delicious, spicy rice and chicken.',
      price: 'PKR 450',
      image: biryaniImg,
    },
    {
      title: 'Nihari',
      shortDescription: 'A slow-cooked stew made with tender beef and rich spices.',
      longDescription: 'A slow-cooked stew made with tender beef, enriched with a blend of spices such as ginger, garlic, and garam masala, typically served with naan or rice.',
      briefDescription: 'Hearty beef stew with spices.',
      price: 'PKR 500',
      image: NahariImg,
    },
    {
      title: 'Seekh Kebabs',
      shortDescription: 'Minced meat grilled to perfection with aromatic spices.',
      longDescription: 'Minced meat (usually beef or chicken) mixed with aromatic spices and herbs, molded onto skewers, and grilled to perfection, often served with naan or a side of mint chutney.',
      briefDescription: 'Spiced minced meat on skewers.',
      price: 'PKR 400',
      image: seekhImg,
    },
  ],
  Indian: [
    {
      title: 'Butter Chicken',
      shortDescription: 'Creamy chicken curry simmered in a flavorful tomato-based sauce.',
      longDescription: 'Creamy and rich chicken curry made with tender pieces of chicken, simmered in a flavorful tomato-based sauce with butter, cream, and aromatic spices.',
      briefDescription: 'Rich and creamy chicken curry.',
      price: 'INR 380',
      image: butterImg,
    },
    {
      title: 'Masala Dosa',
      shortDescription: 'Crispy rice crepes filled with spiced potatoes.',
      longDescription: 'Crispy, thin rice crepes filled with a spiced potato mixture, served with coconut chutney and tangy sambar, a popular South Indian breakfast dish.',
      briefDescription: 'Crispy crepes with spiced potatoes.',
      price: 'INR 200',
      image: maslaImg,
    },
    {
      title: 'Paneer Tikka',
      shortDescription: 'Grilled cubes of paneer marinated with yogurt and spices.',
      longDescription: 'Grilled cubes of paneer (Indian cottage cheese) marinated in a mixture of yogurt and spices, served with a side of mint chutney and onion salad.',
      briefDescription: 'Grilled paneer with spices.',
      price: 'INR 250',
      image: paneerImg,
    },
  ],
  Italian: [
    {
      title: 'Margherita Pizza',
      shortDescription: 'A classic pizza topped with mozzarella and basil.',
      longDescription: 'A classic pizza topped with fresh mozzarella cheese, tangy tomato sauce, and fragrant basil leaves, perfect for a light, savory meal.',
      briefDescription: 'Classic pizza with cheese and basil.',
      price: '$10',
      image: MargheritaImg,
    },
    {
      title: 'Pasta Carbonara',
      shortDescription: 'Pasta in a creamy egg and cheese sauce with pancetta.',
      longDescription: 'Pasta served with a creamy sauce made from eggs, cheese, pancetta, and pepper, offering a rich and comforting flavor.',
      briefDescription: 'Creamy pasta with pancetta.',
      price: '$12',
      image: pastaImg,
    },
    {
      title: 'Tiramisu',
      shortDescription: 'Coffee-soaked ladyfingers layered with mascarpone.',
      longDescription: 'A delightful Italian dessert made with layers of coffee-soaked ladyfingers, mascarpone cheese, cocoa powder, and a hint of liqueur.',
      briefDescription: 'Coffee-soaked dessert with mascarpone.',
      price: '$8',
      image: TiramisuImg,
    },
  ],
  Chinese: [
    {
      title: 'Sweet and Sour Chicken',
      shortDescription: 'Crispy chicken in a sweet and tangy sauce.',
      longDescription: 'Crispy fried chicken tossed in a tangy, sweet sauce made from vinegar, sugar, and ketchup, with pineapple and bell peppers for added flavor.',
      briefDescription: 'Crispy chicken in sweet sauce.',
      price: '$9',
      image: sweetImg,
    },
    {
      title: 'Chow Mein',
      shortDescription: 'Stir-fried noodles with vegetables and soy sauce.',
      longDescription: 'Stir-fried noodles with vegetables, soy sauce, and your choice of chicken, beef, or shrimp, creating a savory and satisfying dish.',
      briefDescription: 'Stir-fried noodles with veggies.',
      price: '$8',
      image: ChowImg,
    },
    {
      title: 'Dumplings',
      shortDescription: 'Savory pockets of dough filled with meat or vegetables.',
      longDescription: 'Savory pockets of dough filled with ground meat, vegetables, or a combination, either steamed, boiled, or fried to a crispy texture.',
      briefDescription: 'Savory dough pockets with filling.',
      price: '$6',
      image: DumplingsImg,
    },
  ],
  Thai: [
    {
      title: 'Pad Thai',
      shortDescription: 'Stir-fried noodles with tamarind sauce, peanuts, and lime.',
      longDescription: 'Stir-fried rice noodles with eggs, tofu, shrimp, and tamarind sauce, topped with peanuts and lime for a perfect balance of sweet, sour, and salty.',
      briefDescription: 'Stir-fried noodles with tamarind sauce.',
      price: '$10',
      image: PadImg,
    },
    {
      title: 'Green Curry',
      shortDescription: 'Spicy curry made with coconut milk and chicken.',
      longDescription: 'A spicy, fragrant curry made with coconut milk, green curry paste, chicken or vegetables, and aromatic herbs like lemongrass and basil.',
      briefDescription: 'Spicy coconut curry with chicken.',
      price: '$11',
      image: GreenImg,
    },
    {
      title: 'Tom Yum Soup',
      shortDescription: 'Spicy and sour shrimp soup with fresh herbs.',
      longDescription: 'A spicy and sour Thai soup made with shrimp, mushrooms, and fresh herbs like lemongrass and kaffir lime leaves.',
      briefDescription: 'Spicy shrimp soup with herbs.',
      price: '$9',
      image: TomImg,
    },
  ],
  French: [
    {
      title: 'Croissant',
      shortDescription: 'Flaky, buttery pastry perfect for breakfast.',
      longDescription: 'Flaky and buttery pastry, golden on the outside and soft inside, perfect for breakfast or a snack, typically served fresh from the oven.',
      briefDescription: 'Flaky buttery pastry.',
      price: '€3',
      image: CroissantImg,
    },
    {
      title: 'Beef Bourguignon',
      shortDescription: 'A hearty French stew made with beef and red wine.',
      longDescription: 'A rich and hearty French stew made with beef, red wine, vegetables, and herbs, slow-cooked until the meat is tender and the flavors are deeply infused.',
      briefDescription: 'Hearty beef stew with wine.',
      price: '€14',
      image: BeefImg,
    },
    {
      title: 'Crème Brûlée',
      shortDescription: 'Creamy custard with a crispy caramelized top.',
      longDescription: 'A creamy custard dessert topped with a layer of caramelized sugar, often served with a hint of vanilla and a crispy top.',
      briefDescription: 'Creamy custard with caramel.',
      price: '€6',
      image: CrèmeImg,
    },
  ],
  Japanese: [
    {
      title: 'Sushi',
      shortDescription: 'Vinegared rice and raw fish or vegetables wrapped in seaweed.',
      longDescription: 'A traditional Japanese dish consisting of vinegared rice, raw fish, and vegetables, wrapped in seaweed or served as nigiri with a piece of fish on top.',
      briefDescription: 'Raw fish with rice and seaweed.',
      price: '¥1200',
      image: SushiImg,
    },
    {
      title: 'Ramen',
      shortDescription: 'Noodles in a rich broth topped with vegetables and meat.',
      longDescription: 'Japanese noodle soup, with a rich broth made from pork, chicken, or miso, and topped with vegetables, eggs, and your choice of meat.',
      briefDescription: 'Noodles in rich broth.',
      price: '¥1000',
      image: RamenImg,
    },
    {
      title: 'Tempura',
      shortDescription: 'Battered and deep-fried seafood or vegetables.',
      longDescription: 'Lightly battered and deep-fried seafood or vegetables, offering a crispy texture and often served with dipping sauce.',
      briefDescription: 'Crispy battered seafood/vegetables.',
      price: '¥950',
      image: TumpuraImg,
    },
  ],
};

function Specialities() {
  const navigate = useNavigate();
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
              <p>{item.shortDescription}</p>
              <span className="price">{item.price}</span>
              <button className="order-bttn"  onClick={() => navigate("/Placeorder", { state: item })}>
          Order Now
        </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Specialities;
