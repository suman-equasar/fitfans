import React, { useContext, useState } from "react";
import { FaCog, FaShareAlt } from "react-icons/fa";
import { BiGrid } from "react-icons/bi";
import { BiCollapseAlt } from "react-icons/bi";
import { TfiBookmark } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";
import { UserContext } from "../context/UserContext"; // Import UserContext
import EditProfile from "../pages/EditProfile"; // Import EditProfile component

const Profile = () => {
  const { name, bio, userId, userHandle } = useContext(UserContext);
  const { isEditModalOpen, setIsEditModalOpen } = useContext(UserContext);
  const [shareUrl, setShareUrl] = useState("");
  const [showSharePopup, setShowSharePopup] = useState(false);

  const images = [
    "https://ik.imagekit.io/svlr7dck0/free-photo-of-charming-cottage-surrounded-by-daisy-field.jpeg?updatedAt=1751003463302",
    "https://ik.imagekit.io/svlr7dck0/pexels-nout-gons-80280-248159.jpg?updatedAt=1751003508798",
    "https://ik.imagekit.io/svlr7dck0/pexels-rickyrecap-1586298.jpg?updatedAt=1751003525326",
    "https://ik.imagekit.io/svlr7dck0/pexels-unchalee-srirugsar-14114-85773.jpg?updatedAt=1751003543088",
    "https://ik.imagekit.io/svlr7dck0/free-photo-of-charming-cottage-surrounded-by-daisy-field.jpeg?updatedAt=1751003463302",
    "https://ik.imagekit.io/svlr7dck0/pexels-nout-gons-80280-248159.jpg?updatedAt=1751003508798",
    "https://ik.imagekit.io/svlr7dck0/pexels-rickyrecap-1586298.jpg?updatedAt=1751003525326",
    "https://ik.imagekit.io/svlr7dck0/free-photo-of-charming-cottage-surrounded-by-daisy-field.jpeg?updatedAt=1751003463302",
    "https://ik.imagekit.io/svlr7dck0/pexels-nout-gons-80280-248159.jpg?updatedAt=1751003508798",
    "https://ik.imagekit.io/svlr7dck0/pexels-rickyrecap-1586298.jpg?updatedAt=1751003525326",
    "https://ik.imagekit.io/svlr7dck0/pexels-unchalee-srirugsar-14114-85773.jpg?updatedAt=1751003543088",
    "https://ik.imagekit.io/svlr7dck0/free-photo-of-charming-cottage-surrounded-by-daisy-field.jpeg?updatedAt=1751003463302",
    "https://ik.imagekit.io/svlr7dck0/pexels-nout-gons-80280-248159.jpg?updatedAt=1751003508798",
    "https://ik.imagekit.io/svlr7dck0/pexels-rickyrecap-1586298.jpg?updatedAt=1751003525326",
  ];

  // State for profile image
  const [previewImage, setPreviewImage] = React.useState(
    localStorage.getItem("profileImage") || "https://via.placeholder.com/80" // Load saved image or default placeholder
  );

  // Save the profile image to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("profileImage", previewImage);
    // const storedName = localStorage.getItem("name");
    // const storedBio = localStorage.getItem("bio");

    // if (storedName) setName(storedName);
    // if (storedBio) setBio(storedBio);
  }, [previewImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-black text-white p-8 rounded-xl w-full max-w-6xl ml-60 mt-10 space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex flex-row items-start gap-3">
            <img
              src="https://ik.imagekit.io/svlr7dck0/free-photo-of-charming-cottage-surrounded-by-daisy-field.jpeg?updatedAt=1751003463302" // Use your uploaded image path or import
              alt="New Banner"
              className="w-18 h-36 rounded-md mb-2 object-cover"
            />

            {/* Profile Image */}
            <div className="relative">
              <img
                src={previewImage} // Use the state for the profile image
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-700 cursor-pointer"
                onClick={() =>
                  document.getElementById("profileImageInput").click()
                }
              />
              <input
                id="profileImageInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
          {/* Username and Details */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-xl font-bold font-productsans">
                  {name || "alexander"}
                </h2>
                <p className="text-gray-400 text-sm">@{userHandle}</p>
              </div>
              <div className="ml-3 flex gap-2">
                <Link
                  to="#"
                  className="bg-gray-800 px-3 py-1 rounded-md text-xs hover:bg-gray-700"
                  onClick={() => setIsEditModalOpen(true)} // Open edit modal
                >
                  Edit profile
                </Link>
                <FaShareAlt
                  onClick={() => {
                    // Store: uuid → actual profile data
                    localStorage.setItem(
                      `profile_${userId}`,
                      JSON.stringify({ name, bio, image: previewImage })
                    );

                    // Clean URL
                    const generatedURL = `${window.location.origin}/shared/${userId}`;
                    setShareUrl(generatedURL);
                    setShowSharePopup(true);
                  }}
                  className="text-lg cursor-pointer hover:text-gray-400"
                />
                <FaCog className="text-lg cursor-pointer hover:text-gray-400" />
              </div>
            </div>

            {/* Stats aligned below name */}
            <div className="flex gap-8 mt-4 text-sm font-bold font-productsans">
              <span className="flex items-center gap-1 font-productsans font-bold">
                <strong className="text-white text-sm">0</strong> posts
              </span>
              <span className="flex items-center gap-1 font-productsans font-bold">
                <strong className="text-white text-sm">0</strong> followers
              </span>
              <span className="flex items-center gap-1 font-productsans font-bold">
                <strong className="text-white text-sm">0</strong> following
              </span>
            </div>

            {/* Bio */}

            <p className="text-xs mt-5 text-[#ffffff] font-AlbertSans max-w-64 whitespace-pre-wrap break-all">
              {bio}
            </p>
          </div>
        </div>
        <div className="flex gap-6 mt-10 pt-4 w-full  text-sm">
          <span className="flex items-center gap-3 text-sm font-AlbertSans font-bold">
            <BiGrid />
            Posts
          </span>
          <span className="flex items-center gap-3 text-sm font-AlbertSans font-bold">
            <BiCollapseAlt />
            Reposts
          </span>
          <span className="flex items-center gap-3 text-sm font-AlbertSans font-bold">
            <TfiBookmark />
            SavedPosts
          </span>
          <span className="flex items-center gap-3 text-sm font-AlbertSans font-bold">
            <CiHeart />
            Liked
          </span>
        </div>
      </div>
      <div className="border-t  border-[#FFFFFF33]  ml-64  "></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 ml-60 p-6">
        {images.map((imgSrc, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl group shadow-md"
          >
            <img
              src={imgSrc}
              alt={`Gallery ${index + 1}`}
              className="w-56 h-full object-cover aspect-[3/4] rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white text-sm px-3 py-2 flex justify-between items-center"></div> */}
          </div>
        ))}
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-[#1E1E1E] bg-opacity-75 flex items-center justify-center z-50 border border-[#FFFFFF1C]">
          <div className="bg-[#1E1E1E] p-6 rounded-xl relative w-full max-w-lg">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-3 text-white text-xl font-bold"
            >
              ×
            </button>
            <EditProfile />
          </div>
        </div>
      )}
      {showSharePopup && (
        <div className="fixed inset-0 bg-[#1E1E1E] bg-opacity-75 flex items-center justify-center z-50 border border-[#FFFFFF1C]">
          <div className="bg-[#1E1E1E] text-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowSharePopup(false)}
              className="absolute top-2 right-3 text-white text-xl font-bold"
            >
              ×
            </button>
            <h2 className="text-lg font-productsans text-[#FFFFFF] mb-4 font-semibold">
              Share Profile
            </h2>

            {/* Relative container for input + button */}
            <div className="relative mb-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full p-2 pr-10  bg-[#D9D9D91A]
                rounded text-[#FFFFFF99]"
              />
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(shareUrl)
                    .then(() => alert("URL copied to clipboard!"))
                    .catch((err) => console.error("Copy failed", err));
                }}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-[#FFFFFF99]"
              >
                <FaRegCopy />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
