// import React from "react";
// import { useLocation } from "react-router-dom";
// // import { Menu } from "lucide-react";

// const Navbar = () => {
//   const location = useLocation();
//   const pathname = location.pathname.replace("/", "") || "Dashboard";

//   return (
//     <div className="flex justify-between items-center bg-white px-6 py-3 shadow-md rounded-lg">
//       {/* Left: Current Path */}
//       <div className="text-xl font-semibold text-gray-700 capitalize">
//         {pathname}
//       </div>

//       {/* Right: Admin Name & Dropdown */}
//       <div className="relative group cursor-pointer">
//         <div className="flex items-center gap-3">
//           <img
//             src="https://i.pravatar.cc/40"
//             alt="Admin Profile"
//             className="w-9 h-9   rounded-full border-2 border-primary"
//           />
//           <span className="font-medium text-gray-700">Admin Name</span>
//         </div>

//         {/* Dropdown */}
//         <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
//           <ul className="py-2">
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Profile
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Settings
//             </li>
//             <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//               Logout
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const pathname = location.pathname.replace("/", "") || "Dashboard";

  return (
    <div className="flex justify-between items-center bg-white px-6 py-3 shadow-md rounded-lg">
      {/* Left: Current Path */}
      <div className="text-xl font-semibold text-gray-700 capitalize">
        {pathname}
      </div>

      {/* Right: Admin Name & Dropdown */}
      <div className="relative group cursor-pointer">
        {/* Profile Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin Profile"
            className="w-9 h-9 rounded-full border-2 border-primary"
          />
          <span className="font-medium text-gray-700">Admin Name</span>
        </div>

        {/* Dropdown */}
        <div
          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg 
                        opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                        transition-all duration-200 z-10"
        >
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Profile
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Settings
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
