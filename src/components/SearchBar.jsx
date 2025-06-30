import React, { useState } from "react"; // Import React and useState

// Top search bar component
const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState(""); // Keyword search state

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload
    onSearch(keyword); // Call the search function from props
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto">
      <div className="flex gap-2">
        {/* Text input for keyword */}
        <input
          type="text"
          placeholder="Search by keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-grow p-2 border border-gray-300 bg-white text-black rounded"
        />
        {/* Submit button */}
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar; // Export component
