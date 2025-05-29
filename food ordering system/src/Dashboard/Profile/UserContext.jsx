// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Ali Khan',
    email: 'ali.khan@example.com',
    phone: '+92 300 1234567',
    address: 'Karachi, Pakistan',
    username: 'alikhan92',
    joined: 'January 2022',
    bio: "Passionate software developer with 5+ years experience in full-stack web development.",
    website: 'https://alikhan.dev',
    profileImage: null, // <- important
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
