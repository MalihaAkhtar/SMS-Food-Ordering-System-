/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChickenMasala from '../../../assets/Chiken-Masala.png';
import SpicyCrab from '../../../assets/Spacy-Fresh-Crab.png';
import ChickenRoll from '../../../assets/Chiken-Roll.png';
import FryFish from '../../../assets/Fry-Fish.png';
import { FaTrashAlt } from 'react-icons/fa';

// Default items in cart with brief descriptions
const defaultItems = [
  {
    id: 1,
    name: 'Chicken Masala',
    desc: 'A spicy, flavorful chicken curry with a rich blend of Indian spices.',
    longDescription: 'Juicy chicken masala cooked with rich Indian spices, best served with naan or rice.',
    productHighlights: [
      { name: 'Spice Level', description: 'Medium' },
      { name: 'Serving Size', description: '1 plate' },
    ],
    price: 45,
    image: ChickenMasala,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Spicy Fresh Crab',
    desc: 'A fiery crab dish cooked in a tangy and spicy sauce.',
    longDescription: 'Fresh crab cooked in hot and spicy sauce, packed with flavor and freshness.',
    productHighlights: [
      { name: 'Heat Level', description: 'High' },
      { name: 'Freshness', description: 'Caught this morning' },
    ],
    price: 45,
    image: SpicyCrab,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Chicken Roll',
    desc: 'Grilled chicken wrapped in soft tortilla with tangy sauce.',
    longDescription: 'A delicious wrap of grilled chicken and tangy sauces rolled in soft bread.',
    productHighlights: [
      { name: 'Bread Type', description: 'Soft tortilla' },
      { name: 'Extras', description: 'Onions, mint sauce' },
    ],
    price: 45,
    image: ChickenRoll,
    quantity: 1,
  },
  {
    id: 4,
    name: 'Fry Fish',
    desc: 'Golden-fried fish with a crispy crust and juicy inside.',
    longDescription: 'Golden-fried fish seasoned with lemon and herbs. Crispy outside, juicy inside.',
    productHighlights: [
      { name: 'Fish Type', description: 'Tilapia' },
      { name: 'Cook Method', description: 'Deep fried' },
    ],
    price: 45,
    image: FryFish,
    quantity: 1,
  },
];

const AddToProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newItem = location.state;

  const [cartItems, setCartItems] = useState(defaultItems);

  // Add new item from ProductDetails (if exists)
  useEffect(() => {
    if (newItem && newItem.title) {
      const itemExists = cartItems.find(item => item.name === newItem.title);
      if (!itemExists) {
        setCartItems(prev => [
          ...prev,
          {
            id: Date.now(),
            name: newItem.title,
            desc: newItem.description || newItem.briefDescription,
            longDescription: newItem.longDescription || 'No details available.',
            productHighlights: newItem.productHighlights || [],
            price: newItem.price,
            image: newItem.image,
            quantity: newItem.quantity || 1,
          },
        ]);
      }
    }
  }, [newItem]);

  const handleQuantityChange = (id, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleNavigateToPlaceOrder = (item) => {
    const formattedItem = {
      title: item.name,
      description: item.desc,
      longDescription: item.longDescription,
      shortDescription: item.shortDescription,
      productHighlights: item.productHighlights,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    };
    navigate('/Placeorder', { state: formattedItem });
  };

  return (
    <div style={{ backgroundColor: '#111', padding: '2rem', color: '#fff' }}>
      <h2 style={{ textAlign: 'left', fontSize: '2rem', margin: '0.5rem 0 1.6rem' }}>Add To Products</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNavigateToPlaceOrder(item)}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              padding: '1rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              cursor: 'pointer',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '8px',
                objectFit: 'cover',
                marginRight: '1.5rem',
              }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{item.name}</h3>
              <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#aaa' }}>{item.desc}</p>
              <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#FFD700' }}>£{item.price}</div>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={(e) => e.stopPropagation()} // Prevents triggering parent onClick
            >
              <button style={qtyButtonStyle} onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
              <span>{item.quantity}</span>
              <button style={qtyButtonStyle} onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
              <button
                style={{ background: 'transparent', border: 'none', color: '#FFD700', cursor: 'pointer' }}
                onClick={() => handleRemoveItem(item.id)}
              >
                <FaTrashAlt size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const qtyButtonStyle = {
  backgroundColor: '#333',
  border: '1px solid #555',
  borderRadius: '4px',
  padding: '0.3rem 0.6rem',
  color: '#fff',
  cursor: 'pointer',
};

export default AddToProduct;
