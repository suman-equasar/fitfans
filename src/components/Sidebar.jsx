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
import React from "react";
import logo from "../assets/Logo.svg"; // Adjust the path as necessary

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-black text-white flex flex-col py-6 px-4 fixed left-0 top-0">
      <img src={logo} alt="logo" className="w-20 h-20 sm:w-28 sm:h-28 mr-2" />

      <div className="mb-6 relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-[90%] pl-10 pr-2 py-2 rounded-[2.5rem] bg-black border-[#FFFFFF1A ] border-[1px] placeholder-[#707070] text-sm"
        />
      </div>
      <nav className="space-y-4 text-sm">
        <MenuItem icon={<FaHome />} label="For You" />
        <MenuItem icon={<FaCompass />} label="Explore" />
        <MenuItem icon={<FaEnvelope />} label="Messages" />
        <MenuItem icon={<FaUpload />} label="Upload" />
        <MenuItem icon={<FaChartLine />} label="Activity" />
        <MenuItem icon={<FaUser />} label="Profile" to="/dashboard/profile" />
        <MenuItem icon={<FaEllipsisH />} label="More" to="/dashboard/more" />
      </nav>
    </aside>
  );
};
import { Link } from "react-router-dom";
const MenuItem = ({ icon, label, to }) => (
  <Link to={to}>
    <div className="flex items-center space-x-3  hover:text-[#08C7BF] cursor-pointer py-2">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  </Link>
);

export default Sidebar;
