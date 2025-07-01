import { v4 as uuidv4 } from "uuid";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState(localStorage.getItem("name") || "alexander");
  const [bio, setBio] = useState(localStorage.getItem("bio") || "");
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
      const newHandle = "user" + uuidv4().slice(0, 6);
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
