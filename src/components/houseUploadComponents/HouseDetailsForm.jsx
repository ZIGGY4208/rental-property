import React from "react";

const HouseDetailsForm = ({
  title,
  setTitle,
  houseType,
  setHouseType,
  location,
  setLocation,
  description,
  setDescription,
  rent,
  setRent,
  className,
}) => {
  return (
    <div
      className={`w-full max-w-5xl mx-auto h-full flex flex-col bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 ${className}`}
    >
      {/* Responsive form container */}
      <div className="flex-1 flex flex-col gap-4 sm:gap-6 min-h-0 text-black">
        {/* Grid layout: 1 col on mobile, 2 cols on sm+, flexible on lg+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* House Title */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1 text-black">
              House Title
            </label>
            <input
              className="w-full border border-purple-600 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Spacious Self-Contain in Mile 16"
            />
          </div>

          {/* House Type */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1 text-black">
              House Type
            </label>
            <input
              className="w-full border border-purple-600 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400 text-sm"
              value={houseType}
              onChange={(e) => setHouseType(e.target.value)}
              placeholder="e.g., Duplex, Studio, etc."
            />
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1 text-black">
              Location
            </label>
            <input
              className="w-full border border-purple-600 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400 text-sm"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Molyko, Check Point"
            />
          </div>

          {/* Rent Price */}
          <div className="flex flex-col">
            <label className="block text-sm font-medium mb-1 text-black">
              Rent Price
            </label>
            <input
              className="w-full border border-purple-600 rounded-md px-3 py-2 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400 text-sm"
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              placeholder="e.g., 85000"
            />
          </div>
        </div>

        {/* Description full width */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium mb-1 text-black">
            Description
          </label>
          <textarea
            className="w-full border border-purple-600 rounded-md px-3 py-2 resize-none focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400 text-sm h-28 sm:h-32 lg:h-36"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
            placeholder="Provide a short description of the house"
          />
          <span className="text-xs text-gray-500 mt-1">
            {description.length}/1000 characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default HouseDetailsForm;
