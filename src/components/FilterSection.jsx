import React, { useState } from 'react';
import { Search } from 'lucide-react';
import FilterLabels from './FilterLabels';
import CustomSelect from './CustomSelect';
import { useNavigate } from 'react-router-dom';

const FilterSection = () => {
  const [filters, setFilters] = useState({
    location: '',
    priceRange: '',
    type: '',
  });

  const navigate = useNavigate();

  const handleChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Clean price input: remove non-digits and parse as number
    const priceNum = parseInt(filters.priceRange.replace(/[^0-9]/g, '')) || '';

    // Build only non-empty filters
    const query = {};
    if (filters.location) query.location = filters.location;
    if (filters.type) query.type = filters.type;
    if (priceNum) query.price = priceNum;

    const queryParams = new URLSearchParams(query).toString();

    console.log("🔗 Navigating with filters:", queryParams);

    navigate(`/houses?${queryParams}`);
    setFilters({ location: '', priceRange: '', type: '' });
  };

  const isFilterEmpty =
    !filters.location && !filters.priceRange && !filters.type;

  return (
    <div className="hidden md:block absolute top-96 left-[41.5%] transform -translate-x-1/2 w-[90%] lg:w-[75%] z-20">
      <FilterLabels />

      <div className="bg-white shadow-xl rounded-b-lg px-4 md:px-8 py-6">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <CustomSelect
            // label="Location"
            value={filters.location}
            onChange={(val) => handleChange('location', val)}
            options={['Molyko', 'Sandpit', 'Checkpoint']}
            className="w-full"
          />

          {/* Price input */}
          <div>
            {/* <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label> */}
            <input
              type="text"
              name="priceRange"
              value={filters.priceRange}
              onChange={(e) => handleChange('priceRange', e.target.value)}
              placeholder="e.g. 50000"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-gray-700 focus:border-2"
            />
          </div>

          <CustomSelect
            // label="Type"
            value={filters.type}
            onChange={(val) => handleChange('type', val)}
            options={['Single Room', 'Studio', 'Apartment']}
            className="w-full"
          />

          <div className="flex">
            <button
              type="button"
              onClick={handleSearch}
              disabled={isFilterEmpty}
              className={`flex-1 ${
                isFilterEmpty
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-purple-700 hover:bg-purple-800'
              } text-white font-semibold px-4 py-2 rounded transition flex items-center justify-center gap-2`}
            >
              <Search size={18} /> Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSection;
