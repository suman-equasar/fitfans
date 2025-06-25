import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext if needed

const EditProfile = () => {
  const navigate = useNavigate();
  const { name, setName, bio, setBio } = useContext(UserContext);
  const [error, setError] = useState(""); // State for error message

  const bioRegex = /^.{0,200}$/; // Regex to allow up to 200 characters

  const handleBioChange = (e) => {
    const newBio = e.target.value;

    if (bioRegex.test(newBio)) {
      setBio(newBio);
      setError(""); // Clear error if valid
    } else {
      setError("Bio cannot exceed 200 characters."); // Set error if invalid
    }
  };
  const handleSave = () => {
    if (!bioRegex.test(bio)) {
      setError("Bio cannot exceed 200 characters.");
      return;
    }

    navigate("/dashboard/profile"); // Go back to profile page
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-black text-white rounded-xl space-y-4">
      <h2 className="text-xl font-bold font-productsans">Edit Profile</h2>

      <div className="space-y-2">
        <label className="block text-sm font-productsans">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
          className="w-full px-3 py-2 bg-gray-800  font-productsans text-[#707070]
          rounded-md focus:outline-none"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-productsans">Bio</label>
        <textarea
          value={bio}
          onChange={handleBioChange}
          className="w-full px-3 py-2 bg-gray-800 rounded-md  font-productsans text-[#707070] resize-none focus:outline-none"
          rows={4}
        />
        <div className="text-right text-xs text-[#707070]">
          {bio.length}/200
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
