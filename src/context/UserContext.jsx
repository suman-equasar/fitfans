import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("name") || "alexander");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);



  // Sync to localStorage when values change
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
  }, [name, bio]);

  return (
    <UserContext.Provider value={{ name, setName, bio, setBio, isEditModalOpen, setIsEditModalOpen }}>
      {children}
    </UserContext.Provider>
  );
};
