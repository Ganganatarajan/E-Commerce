import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.replace("/", "") || "PremiumAds";

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Clear any authentication tokens or user data here if needed
    // For example:
    // localStorage.removeItem('authToken');

    // Navigate to login page
    navigate("/login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning 👋";
    if (hour < 17) return "Good Afternoon 👋";
    return "Good Evening 👋";
  };

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow-md rounded-lg">
      {/* Left: Current Path */}
      <div className="text-xl font-semibold text-gray-700 capitalize">
        {getGreeting()}
      </div>

      {/* Right: Admin Name & Dropdown */}
      <div className="relative group cursor-pointer">
        {/* Profile Info */}
        <div
          className="flex items-center gap-3"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin Profile"
            className="w-9 h-9 rounded-full border-2 border-primary"
          />
          <span className="font-medium text-gray-700">Admin Name</span>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg 
          transition-all duration-200 z-10"
          >
            <ul className="py-2">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
