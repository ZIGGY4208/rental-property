import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FilterLabels from './FilterLabels';
import CustomSelect from './CustomSelect';
import StatsSection from './StatsSection';

const FilterSection = () => {
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    type: '',
  });

  const handleChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    setFilters({
      location: '',
      priceRange: '',
      type: '',
    });
  };

  return (
    <div className="hidden md:block absolute top-96 left-[40.5%]  transform -translate-x-1/2 w-[90%] lg:w-[75%] z-20">
      {/* Label Header */}
      <FilterLabels />

      {/* Filter Form */}
      <div className="bg-white shadow-xl rounded-b-lg px-4 md:px-8 py-6">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Location */}
          <CustomSelect
            label="Location"
            value={filters.location}
            onChange={(val) => handleChange('location', val)}
            options={['Molyko', 'Sandpit', 'Checkpoint']}
            className="w-full"
          />

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
            <input
              type="text"
              name="priceRange"
              value={filters.priceRange}
              onChange={(e) => handleChange('priceRange', e.target.value)}
              placeholder="20000 - 50000"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-700 focus:border-2"
            />
          </div>

          {/* Property Type */}
          <CustomSelect
            label="Type"
            value={filters.type}
            onChange={(val) => handleChange('type', val)}
            options={['Single Room', 'Studio', 'Apartment']}
            className="w-full"
          />

          {/* Search Button */}
          <div className="flex">
            <button
              type="button"
              onClick={handleSearch}
              className="flex-1 bg-purple-700 text-white font-semibold px-4 py-2 rounded hover:bg-purple-800 transition flex items-center justify-center gap-2"
            >
              <Search size={18} /> Search
            </button>
          </div>
        </form>
      </div>
      {/* <StatsSection/> */}
    </div>
  );
};

export default FilterSection;
