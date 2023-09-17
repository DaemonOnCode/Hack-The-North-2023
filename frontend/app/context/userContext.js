"use client"
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const value = { user, setUser };

  useEffect(() => {}, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
