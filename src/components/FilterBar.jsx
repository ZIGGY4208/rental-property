import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApply = () => {
    onFilterChange({
      type,
      location,
      minPrice: Number(minPrice) || 0,
      maxPrice: Number(maxPrice) || Infinity,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <select value={type} onChange={(e) => setType(e.target.value)} className="p-2 border rounded">
        <option value="">All Types</option>
        <option value="Studio">Studio</option>
        <option value="1 Bedroom">1 Bedroom</option>
        <option value="2 Bedroom">2 Bedroom</option>
        <option value="Self-Contain">Self-Contain</option>
        <option value="Duplex">Duplex</option>
        <option value="Shared Apartment">Shared Apartment</option>
      </select>

      <select value={location} onChange={(e) => setLocation(e.target.value)} className="p-2 border rounded">
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

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border rounded"
      />

      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
