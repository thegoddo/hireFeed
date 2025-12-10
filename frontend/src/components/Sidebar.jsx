import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlusSquare, FaBookmark, FaUserCircle } from "react-icons/fa";

const Sidebar = ({ currentUser }) => {
  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-64 h-screen fixed left-0 top-0 bg-black/90 text-white border-r border-white/10 z-50 backdrop-blur-xl">
      {/* 🔹 Logo Area */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">
          H
        </div>
        <span className="font-bold text-xl tracking-wide hidden lg:block">
          HireFeed
        </span>
      </div>

      {/* 🔹 Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 px-3 mt-4">
        <NavItem to="/" icon={<FaHome size={22} />} label="Discover" />
        <NavItem
          to="/saved"
          icon={<FaBookmark size={20} />}
          label="Shortlist"
        />
        <NavItem
          to="/upload"
          icon={<FaPlusSquare size={20} />}
          label="Post Job / Pitch"
        />
        <NavItem
          to={`/profile/${currentUser?._id}`}
          icon={<FaUserCircle size={22} />}
          label="Profile"
        />
      </nav>

      {/* 🔹 User Mini Profile (Bottom) */}
      <div className="p-4 border-t border-white/10 hidden lg:flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
        <div className="flex flex-col overflow-hidden">
          <span className="text-sm font-bold truncate">
            {currentUser?.username || "Guest"}
          </span>
          <span className="text-xs text-gray-400 capitalize">
            {currentUser?.role || "Visitor"}
          </span>
        </div>
      </div>
    </aside>
  );
};

// Helper Component for cleaner code
const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`
    }
  >
    <span className="group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium hidden lg:block">{label}</span>
  </NavLink>
);

export default Sidebar;
