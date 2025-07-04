import { v4 as uuidv4 } from "uuid";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  const [name, setName] = useState(currentUser.name || "alexander");
  const [bio, setBio] = useState(currentUser.bio || "");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Unique user ID (never changes)
  const getOrCreateUserId = () => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      const newId = uuidv4();
      localStorage.setItem("userId", newId);
      return newId;
    }
    return storedId;
  };
  const [userId] = useState(getOrCreateUserId());

  // Unique user handle (e.g. @user3fae1b)
  const getOrCreateHandle = () => {
    let handle = localStorage.getItem("handle");
    if (!handle) {
      let userName = localStorage.getItem("name") || "alexander";
      userName = userName.toLowerCase().replace(/\s+/g, "");
      const newHandle = userName + uuidv4().slice(0, 6);
      localStorage.setItem("handle", newHandle);
      return newHandle;
    }
    return handle;
  };
  const [userHandle] = useState(getOrCreateHandle());

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
