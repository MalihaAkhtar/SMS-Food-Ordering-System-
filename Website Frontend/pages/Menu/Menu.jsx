// MenuSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import MenuItem from "./MenuItem";
import biryaniImg from '../../assets/biryani.jpg';
import NahariImg from '../../assets/Nihari.jpg';
import seekhImg from '../../assets/seekh kabab.jpg';
import butterImg from '../../assets/butter chicken.jpg';
import maslaImg from '../../assets/masla dosa.jpg';
import paneerImg from '../../assets/paneer tikka.jpg';
import MargheritaImg from '../../assets/Margherita Pizza.jpg';
import pastaImg from '../../assets/Pasta Carbonara.jpg';
import TiramisuImg from '../../assets/Tiramisu.jpg';
import sweetImg from '../../assets/Sweet and Sour Chicken.jpg';
import ChowImg from '../../assets/Chow Mein.jpg';
import DumplingsImg from '../../assets/Dumplings.jpg';

const USD_TO_PKR = 278;

const menuItems = [
  { image: biryaniImg, title: "Chicken Biryani", description: "Spicy basmati rice with marinated chicken", longDescription: "A rich and aromatic South Asian rice dish made with marinated chicken, layered with fragrant basmati rice, saffron, caramelized onions, and traditional spices. Served with cooling raita and salad.", price: 5.99 },
  { image: NahariImg, title: "Beef Nihari", description: "Slow-cooked beef stew with rich spices", longDescription: "A traditional Pakistani slow-cooked beef stew simmered for hours in bone marrow and spices. Best enjoyed with naan or paratha for a hearty and flavorful meal.", price: 10.99 },
  { image: pastaImg, title: "Pasta Carbonara", description: "Creamy Italian pasta with cheese and bacon", longDescription: "An authentic Italian pasta dish made with spaghetti, eggs, Parmesan cheese, crispy bacon, and freshly ground black pepper. Creamy, rich, and comforting.", price: 7.99 },
  { image: seekhImg, title: "Seekh Kebab", description: "Grilled skewers of spiced minced meat", longDescription: "Juicy and smoky kebabs made from minced meat mixed with herbs and spices, shaped on skewers and grilled to perfection. Often served with mint chutney and salad.", price: 6.99 },
  { image: butterImg, title: "Butter Chicken", description: "Creamy tomato-based Indian chicken curry", longDescription: "A classic North Indian curry where chicken is cooked in a velvety tomato-cream sauce infused with butter, spices, and herbs. Served best with naan or rice.", price: 8.99 },
  { image: maslaImg, title: "Masala Dosa", description: "South Indian crepe filled with spiced potatoes", longDescription: "A crispy, thin South Indian pancake made from rice batter and lentils, stuffed with a savory filling of mashed potatoes and spices. Served with coconut chutney and sambar.", price: 3.99 },
  { image: paneerImg, title: "Paneer Tikka", description: "Grilled cottage cheese cubes marinated in spices", longDescription: "A vegetarian favorite made with chunks of paneer marinated in yogurt and spices, skewered with vegetables, and grilled. Served with green chutney and onions.", price: 4.47 },
  { image: MargheritaImg, title: "Margherita Pizza", description: "Classic pizza with mozzarella, basil & tomato", longDescription: "A simple yet delicious pizza topped with fresh mozzarella cheese, tomato sauce, and fragrant basil leaves. A timeless Italian classic with perfect balance.", price: 7.99 },
  { image: TiramisuImg, title: "Tiramisu", description: "Layered coffee-flavored Italian dessert", longDescription: "A popular Italian dessert made of layers of coffee-soaked ladyfingers, mascarpone cream, and dusted cocoa powder. Light, creamy, and indulgent.", price: 9.14 },
  { image: sweetImg, title: "Sweet & Sour Chicken", description: "Crispy chicken in tangy sweet sauce", longDescription: "Crispy battered chicken chunks tossed in a vibrant sweet and sour sauce made with bell peppers, pineapple, and onions. A delightful mix of flavors and textures.", price: 10.99 },
  { image: ChowImg, title: "Chow Mein", description: "Chinese stir-fried noodles with vegetables", longDescription: "Stir-fried noodles cooked with soy sauce, garlic, vegetables, and your choice of protein. A classic Chinese dish full of flavor and texture.", price: 6.00 },
  { image: DumplingsImg, title: "Chinese Dumplings", description: "Steamed or fried dough filled with meat or veggies", longDescription: "Delicate dumplings filled with minced meat or vegetables, either steamed or pan-fried. Served with a soy-based dipping sauce and enjoyed as a savory appetizer or meal.", price: 9.99 }
];

const MenuSection = () => {
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate('/place-order', { 
      state: { ...item, price: `${(item.price * USD_TO_PKR).toFixed(0)} PKR` } 
    });
  };

  return (
    <section className="menu-section">
      <h2>Our Flavorful Menus</h2>
      <div className="menu-grid">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            {...item}
            price={`${(item.price * USD_TO_PKR).toFixed(0)} PKR`}
            handleClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
