import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext"; // Import UserContext if needed

const EditProfile = () => {
  const { name, setName, bio, setBio } = useContext(UserContext);
  const { setIsEditModalOpen } = useContext(UserContext);
  const [error, setError] = useState(""); // State for error message
  const [tempName, setTempName] = useState(name); // Temporary state for name
  const [tempBio, setTempBio] = useState(bio); // Temporary state for bio
  const bioRegex = /^.{0,200}$/; // Regex to allow up to 200 characters

  useEffect(() => {
    setTempName(name); // Initialize tempName with current name
    setTempBio(bio); // Initialize tempBio with current bio
  }, [name, bio]);

  const handleBioChange = (e) => {
    const newBio = e.target.value;

    if (bioRegex.test(newBio)) {
      setTempBio(newBio);
      setError(""); // Clear error if valid
    } else {
      setError("xyz"); // Set error if invalid
    }
  };
  const handleSave = () => {
    setName(tempName);
    setBio(tempBio);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    // Update the current user object
    const updatedUser = {
      ...currentUser,
      name: tempName,
      bio: tempBio,
    };

    // Save to localStorage: currentUser
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Update the users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.userId === updatedUser.userId ? updatedUser : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setIsEditModalOpen(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-[#1E1E1E] text-white rounded-xl space-y-4">
      <h2 className="text-xl font-bold font-productsans">Edit Profile</h2>

      <div className="space-y-2">
        <label className="block text-sm font-productsans">Name</label>
        <input
          type="text"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          maxLength={50}
          className="w-full px-3 py-2 bg-[#D9D9D91A]  font-productsans text-[#FFFFFF99]
          rounded-md focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-productsans">Bio</label>
        <textarea
          value={tempBio}
          onChange={handleBioChange}
          className="w-full px-3 py-2 bg-[#D9D9D91A] rounded-md  font-productsans text-[#FFFFFF99] resize-none focus:outline-none"
          rows={4}
        />
        <div className="text-right text-xs text-[#FFFFFF99]">
          {tempBio.length}/200
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <button
        onClick={handleSave}
        className="bg-[#08C7BF] px-4 py-2 rounded-md hover:bg-teal-600 text-sm"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
