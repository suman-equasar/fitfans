import React from "react";
import { useParams } from "react-router-dom";

const SharedProfile = () => {
  const { id } = useParams();

  // Step 2: Fetch profile using UUID
  const profileData = JSON.parse(localStorage.getItem(`profile_${id}`));

  // Step 3: Fallback if not found
  if (!profileData) {
    return (
      <div className="text-center mt-20 text-white">Profile not found.</div>
    );
  }

  return (
    <div className="bg-black text-white p-8 rounded-xl w-full max-w-2xl mx-auto mt-10 space-y-6">
      <img
        src={profileData.image || "https://via.placeholder.com/100"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border border-gray-600 mx-auto"
      />
      <h2 className="text-center text-2xl font-bold">{profileData.name}</h2>

      <p className="text-sm text-center mt-4">{profileData.bio}</p>
    </div>
  );
};

export default SharedProfile;
