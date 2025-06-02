import React, { useState } from "react";
import {
  FaAd,
  FaImages,
  FaBed,
  FaHotel,
  FaUsers,
  FaBriefcase,
  FaUserTie,
  FaUserCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  const menuItems = [
    { name: "Premium Ads", icon: <FaAd />, path: "/PremiumAds" },
    { name: "Carousel Ads", icon: <FaImages /> },
    { name: "Hostels", icon: <FaBed />, path: "/hostel" },
    { name: "Hotels", icon: <FaHotel /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Skilled Directories", icon: <FaBriefcase /> },
    { name: "Jobs", icon: <FaUserTie /> },
    { name: "Admins", icon: <FaUserCog /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#1f2937] text-white p-2 rounded-md shadow-md"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar content */}
      <div className="w-64 h-full bg-gradient-to-b from-[#004c8d] to-[#003366] text-white shadow-xl">
        <div className="p-5 border-b border-blue-800">
          <img src="./logo.png" alt="" />
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setActiveMenu(item.name)}
                  className={`w-full flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 
        ${
          activeMenu === item.name
            ? "bg-white text-blue-700 font-semibold shadow-inner"
            : "text-gray-200 hover:bg-blue-800 hover:text-white"
        }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-base">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
