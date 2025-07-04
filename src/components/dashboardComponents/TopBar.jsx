import React, { useState } from "react";

const TopBar = ({
  user = { name: "Guest User", avatar: "/img/default-avatar.jpg" },
  availableLanguages = ["ENG", "FRA"],
  currentLanguage = "ENG",
  onLanguageChange = () => {},
  onSearch = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center space-x-2"
        role="search"
      >
        <input
          className="bg-gray-100 rounded-lg px-4 py-2 w-72 outline-none"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search"
        />
        <button
          type="submit"
          className="text-gray-400 hover:text-gray-700 transition"
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

      <div className="flex items-center space-x-6">
        <select
          className="bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
          value={currentLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          aria-label="Select language"
        >
          {availableLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <span className="font-semibold text-gray-700">{user.name}</span>

        <img
          src={user.avatar}
          alt={user.name}
          className="w-9 h-9 rounded-full border-2 border-emerald-600 object-cover"
        />
      </div>
    </header>
  );
};

export default TopBar;
