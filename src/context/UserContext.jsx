import { v4 as uuidv4 } from "uuid";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [name, setName] = useState(currentUser.name || "alexander");
  const [bio, setBio] = useState(currentUser.bio || "");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userId] = useState(currentUser.userId || "");
  const [userHandle] = useState(currentUser.handle || "");

  // Unique user ID (never changes)

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        bio,
        setBio,
        userId,
        userHandle,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
