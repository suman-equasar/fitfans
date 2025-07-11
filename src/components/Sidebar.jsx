import {
  FaHome,
  FaSearch,
  FaCompass,
  FaEnvelope,
  FaUpload,
  FaChartLine,
  FaUser,
  FaEllipsisH,
} from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg"; // Adjust the path as necessary

const Sidebar = () => {
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    localStorage.clear(); // Clear user-related data
    navigate("/"); // Redirect to login page
  };

  return (
    <aside className="h-screen w-64 bg-black gap-4 text-white flex flex-col py-4 px-4 fixed left-0 top-0">
      {/* Logo */}

      <div className="flex mb-2 items-center ">
        <img src={logo} alt="Logo" className="w-28 " />
      </div>

      {/* Search Bar */}
      <div className=" relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-[70%] pl-10 pr-2 py-1 rounded-[2.5rem] bg-black border-[#FFFFFF1A ] border-[1px] placeholder-[#707070] text-sm"
        />
      </div>

      {/* Navigation Menu */}
      <nav
        className="space-y-4  font-medium
       font-productsans"
      >
        <MenuItem icon={<FaHome />} label="For You" />
        <MenuItem icon={<FaCompass />} label="Explore" />
        <MenuItem icon={<FaEnvelope />} label="Messages" />
        <MenuItem icon={<FaUpload />} label="Upload" />
        <MenuItem icon={<FaChartLine />} label="Activity" />
        <MenuItem icon={<FaUser />} label="Profile" to="/dashboard/profile" />

        {/* More Button with Popup */}
        <div className="relative">
          <div
            className="flex items-center space-x-3 hover:text-[#08C7BF] cursor-pointer "
            onClick={() => setShowPopup(!showPopup)}
          >
            {/* Fixed width icon for consistent spacing */}
            <span className="text-lg w-5 flex justify-center">
              <FaEllipsisH />
            </span>
            <span>More</span>
          </div>

          {/* Popup */}
          {showPopup && (
            <div className="absolute top-full left-0 mt-1 bg-black border border-gray-700 rounded-md shadow-lg w-32 z-50">
              <ul className="space-y-2 p-2">
                <li className="hover:text-[#08C7BF] cursor-pointer flex items-center space-x-2 text-white">
                  <TbLogout className="text-lg" />
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

const MenuItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center space-x-3 hover:text-[#08C7BF] cursor-pointer text-[16px] py-2">
      <span className=" w-5 flex justify-center">{icon}</span>
      <span>{label}</span>
    </div>
  </Link>
);

export default Sidebar;
