import React, { useState } from "react";

const FilterSidebar = ({ onFilterChange }) => {
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleClear = () => {
    setType("");
    setLocation("");
    setPrice("");
    onFilterChange({ type: "", location: "", price: null });
  };

  const triggerFilter = (filters) => {
    onFilterChange({
      ...filters,
      price: filters.price ? parseInt(filters.price) : null,
    });
  };

  return (
    <div className="space-y-4 text-black">
      <select
        value={type}
        onChange={(e) => {
          const val = e.target.value;
          setType(val);
          triggerFilter({ type: val, location, price });
        }}
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

      <select
        value={location}
        onChange={(e) => {
          const val = e.target.value;
          setLocation(val);
          triggerFilter({ type, location: val, price });
        }}
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

      <input
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => {
          const val = e.target.value;
          setPrice(val);
          triggerFilter({ type, location, price: val });
        }}
        className="w-full p-2 border border-gray-300 bg-white text-black rounded"
      />

      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
