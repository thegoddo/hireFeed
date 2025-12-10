import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusSquare, FaBookmark } from "react-icons/fa";

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-black border-t border-white/10 z-50 flex items-center justify-around px-2 pb-safe">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 transition-colors ${
            isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
          }`
        }
      >
        <FaHome size={24} />
        <span className="text-[10px] mt-1 font-medium">Home</span>
      </NavLink>

      {/* Center Plus Button with Glow */}
      <NavLink to="/upload" className="flex items-center justify-center">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 mb-4 transform transition active:scale-95 hover:bg-blue-500 border border-white/10">
          <FaPlusSquare size={24} />
        </div>
      </NavLink>

      <NavLink
        to="/saved"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 transition-colors ${
            isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
          }`
        }
      >
        <FaBookmark size={20} />
        <span className="text-[10px] mt-1 font-medium">Saved</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
