import React, { useState } from "react"; // Import React and useState

// Sidebar component that allows filtering by type, location, and price
const FilterSidebar = ({ onFilterChange }) => {
  const [type, setType] = useState(""); // House type state
  const [location, setLocation] = useState(""); // Location state
  const [minPrice, setMinPrice] = useState(""); // Minimum price
  const [maxPrice, setMaxPrice] = useState(""); // Maximum price

  // Applies selected filters and passes to parent component
  const handleApply = () => {
    onFilterChange({
      type,
      location,
      minPrice: parseInt(minPrice) || 0,
      maxPrice: parseInt(maxPrice) || Infinity,
    });
  };

  return (
    <div className="space-y-4 text-black">
      {/* Dropdown to filter by house type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 border border-gray-300 bg-white text-black rounded"
      >
        <option value="">All Types</option>
        <option value="Studio">Studio</option>
        <option value="1 Bedroom">1 Bedroom</option>
        <option value="2 Bedroom">2 Bedroom</option>
        <option value="Self-Contain">Self-Contain</option>
        <option value="Duplex">Duplex</option>
        <option value="Shared Apartment">Shared Apartment</option>
      </select>

      {/* Dropdown to filter by location */}
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full p-2 border border-gray-300 bg-white text-black rounded"
      >
        <option value="">All Locations</option>
        <option value="Molyko">Molyko</option>
        <option value="Mile 16">Mile 16</option>
        <option value="Sandpit">Sandpit</option>
        <option value="Check Point">Check Point</option>
        <option value="Soppo">Soppo</option>
        <option value="Great Soppo">Great Soppo</option>
        <option value="Bonduma">Bonduma</option>
        <option value="Wotutu">Wotutu</option>
      </select>

      {/* Input for minimum price */}
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="w-full p-2 border border-gray-300 bg-white text-black rounded"
      />

      {/* Input for maximum price */}
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="w-full p-2 border border-gray-300 bg-white text-black rounded"
      />

      {/* Apply filter button */}
      <button
        onClick={handleApply}
        className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar; // Export component
