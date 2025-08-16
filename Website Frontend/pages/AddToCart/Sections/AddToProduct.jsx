/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChickenMasala from '../../../assets/Chiken-Masala.png';
import SpicyCrab from '../../../assets/Spacy-Fresh-Crab.png';
import ChickenRoll from '../../../assets/Chiken-Roll.png';
import FryFish from '../../../assets/Fry-Fish.png';
import { FaTrashAlt } from 'react-icons/fa';

const defaultItems = [
  // ..const defaultItems = [
  {
    id: 1,
    name: 'Chicken Masala',
    desc: 'A spicy, flavorful chicken curry with a rich blend of Indian spices.',
    longDescription: 'Juicy chicken masala cooked with rich Indian spices, best served with naan or rice.',
    price: 1400,
    image: ChickenMasala,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Spicy Fresh Crab',
    desc: 'A fiery crab dish cooked in a tangy and spicy sauce.',
    longDescription: 'Fresh crab cooked in hot and spicy sauce, packed with flavor and freshness.',
    price: 1100,
    image: SpicyCrab,
    quantity: 1,
  },
  {
    id: 3,
    name: 'Chicken Roll',
    desc: 'Grilled chicken wrapped in soft tortilla with tangy sauce.',
    longDescription: 'A delicious wrap of grilled chicken and tangy sauces rolled in soft bread.',
    price: 360,
    image: ChickenRoll,
    quantity: 1,
  },
  {
    id: 4,
    name: 'Fry Fish',
    desc: 'Golden-fried fish with a crispy crust and juicy inside.',
    longDescription: 'Golden-fried fish seasoned with lemon and herbs. Crispy outside, juicy inside.',
    price: 900,
    image: FryFish,
    quantity: 1,
  },
];




const AddToProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newItem = location.state;
 const newItemRef = useRef(location.state);
  const [cartItems, setCartItems] = useState([]);
  const [addedItems, setAddedItems] = useState(() => {
    // Initialize from localStorage on first render
    const stored = localStorage.getItem('addedItems');
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  // Save addedItems to localStorage on change
  useEffect(() => {
    localStorage.setItem('addedItems', JSON.stringify(Array.from(addedItems)));
  }, [addedItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setCartItems(defaultItems);
      }
    };
    fetchCartItems();
  }, []);
useEffect(() => {
    const newItem = newItemRef.current;
    if (newItem && newItem.title && !addedItems.has(newItem.title)) {
      const addOrUpdateItem = async () => {
        setCartItems(prevCartItems => {
          const existingItem = prevCartItems.find(item => item.name === newItem.title);
          if (existingItem) {
            const updatedItem = {
              ...existingItem,
              quantity: existingItem.quantity + (newItem.quantity || 1),
            };
            updateItemInDB(updatedItem).catch(console.error);
            return prevCartItems.map(item => (item.name === newItem.title ? updatedItem : item));
          } else {
            const newCartItem = {
              name: newItem.title,
              desc: newItem.description || newItem.briefDescription || '',
              longDescription: newItem.longDescription || 'No details available.',
              price: newItem.price,
              image: newItem.image,
              quantity: newItem.quantity || 1,
            };
            saveItemToDB(newCartItem)
              .then(savedId => {
                if (savedId) {
                  setCartItems(currentItems => [...currentItems, { ...newCartItem, id: savedId }]);
                } else {
                  setCartItems(currentItems => [...currentItems, newCartItem]);
                }
              })
              .catch(console.error);
            return prevCartItems;
          }
        });
        setAddedItems(prev => new Set(prev).add(newItem.title));
      };
      addOrUpdateItem();
    }
  }, [addedItems]);


  const saveItemToDB = async (item) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cart", item);
      return response.data.id || null;
    } catch (error) {
      console.error("❌ Failed to save item:", error);
      return null;
    }
  };

  const updateItemInDB = async (item) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${item.id}`, item);
    } catch (error) {
      console.error("❌ Failed to update item:", error);
    }
  };

  const removeItemFromDB = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
    } catch (error) {
      console.error("❌ Failed to remove item:", error);
    }
  };

  const handleQuantityChange = async (id, type) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);

    const updatedItem = updatedCartItems.find(item => item.id === id);
    try {
      await updateItemInDB(updatedItem);
    } catch (error) {
      console.error("Failed to update item quantity in DB:", error);
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    removeItemFromDB(id);
  };

  return (
    <div style={{ backgroundColor: '#111', padding: '2rem', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', fontSize: '2rem', margin: '0.5rem 0 1.6rem', color: '#F3D382' }}>
        Add To Products
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {cartItems.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate('/payment', { state: { cartItems: cartItems } })}
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
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#F3D382' }}>{item.name}</h3>
              <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#D9D9D9' }}>{item.desc}</p>
              <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#F3D382' }}>
                PKR {item.price}
              </div>
            </div>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button style={qtyButtonStyle} onClick={() => handleQuantityChange(item.id, 'dec')}>-</button>
              <span>{item.quantity}</span>
              <button style={qtyButtonStyle} onClick={() => handleQuantityChange(item.id, 'inc')}>+</button>
              <button
                style={{ background: 'transparent', border: 'none', color: '#F3BE32', cursor: 'pointer' }}
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

