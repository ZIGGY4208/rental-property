import React from "react";
const userAvatar = "/img/user-avatar.jpg";

const TopBar = () => (
  <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
    <div className="flex items-center space-x-4">
      <input
        className="bg-gray-100 rounded-lg px-4 py-2 w-72 outline-none"
        type="text"
        placeholder="Search"
      />
      <button className="ml-2 text-gray-400">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
    </div>
    <div className="flex items-center space-x-6">
      <select className="bg-gray-100 px-2 py-1 rounded text-sm">
        <option>ENG</option>
        <option>FRA</option>
      </select>
      <span className="font-semibold text-gray-700">Dr. Norica</span>
      <img
        src={userAvatar}
        alt="User"
        className="w-9 h-9 rounded-full border-2 border-emerald-600 object-cover"
      />
    </div>
  </header>
);

export default TopBar;
