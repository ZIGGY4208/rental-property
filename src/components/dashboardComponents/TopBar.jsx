import React, { useState } from "react";

const TopBar = ({ user = { name: "Guest User", avatar: "/img/default-avatar.jpg" }, onSearch = () => {} }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 bg-white shadow-sm space-y-3 sm:space-y-0">
      {/* Search bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full sm:w-auto max-w-md sm:max-w-sm space-x-2"
        role="search"
      >
        <input
          className="flex-1 bg-gray-100 rounded-lg px-3 py-2 text-sm sm:text-base outline-none"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        <button
          type="submit"
          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition flex items-center justify-center"
          aria-label="Submit search"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>

      {/* Desktop profile image */}
      <img
        src={user.avatar}
        alt={user.name}
        className="hidden md:inline w-12 h-12 rounded-full border-4 border-purple-600 object-cover transition-all duration-300"
      />
    </header>
  );
};

export default TopBar;
