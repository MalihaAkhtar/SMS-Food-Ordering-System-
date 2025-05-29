import React, { createContext, useContext, useState } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, item]);
  };

  const addToWishlist = (item) => {
    setWishlistItems((prev) => [...prev, item]);
  };

  return (
    <ShopContext.Provider value={{ cartItems, wishlistItems, addToCart, addToWishlist }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
