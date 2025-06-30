// src/components/filter/FilterLabels.jsx
import React from 'react';
import { MapPin, Wallet, Home as HomeIcon, Search } from 'lucide-react';

const FilterLabels = () => {
  return (
    <div className="w-[280px] md:w-[300px] lg:w-[340px] flex justify-between items-center bg-white text-gray-800 text-xs md:text-sm font-semibold px- md:px-5 py-3 rounded-t-lg shadow-md">
      <div className="flex items-center ">
        <MapPin size={14} /> Location
      </div>
      <div className="flex items-center gap-1">
        <Wallet size={14} /> Price
      </div>
      <div className="flex items-center gap-1">
        <HomeIcon size={14} /> Type
      </div>
      {/* <div className="flex items-center gap-1">
        <Search size={14} /> Search
      </div> */}
    </div>
  );
};

export default FilterLabels;
