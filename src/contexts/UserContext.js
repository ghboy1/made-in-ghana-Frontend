import React, { createContext, useState } from 'react';

// Create the UserContext with a default value of null
export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Rauf Hu',
    digitalAddress: 'AF-0347-3725', // Default digital address
    // other user data
  });
  const [cart] = useState({ items: [] });

  const updateDigitalAddress = (newAddress) => {
    setUser((prevUser) => ({ ...prevUser, digitalAddress: newAddress }));
  };

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    cart,
    updateDigitalAddress,
    login,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};