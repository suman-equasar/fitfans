import React, { useState, useEffect, createContext } from "react";
export const UserContext = createContext();
import { v4 as uuidv4 } from "uuid";

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("name") || "alexander");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") || uuidv4()
  );

  // Sync to localStorage when values change
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("bio", bio);
  }, [name, bio, userId]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        bio,
        setBio,
        isEditModalOpen,
        setIsEditModalOpen,
        userId,
        setUserId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
