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
  discount,
  setDiscount,
  className,
}) => {
  return (
    <div className={`h-full flex flex-col bg-white rounded-xl shadow-md p-6 ${className}`}>
      <div className="flex-1 flex flex-col gap-6 overflow-auto text-black">
        {/* House Title */}
        <div className="flex flex-col flex-1">
          <label className="block text-base font-semibold mb-2 text-black">House Title</label>
          <input
            className="w-full border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Spacious Self-Contain in Mile 16"
          />
        </div>

        {/* House Type */}
        <div className="flex flex-col flex-1">
          <label className="block text-base font-semibold mb-2 text-black">House Type</label>
          <input
            className="w-full border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400"
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            placeholder="e.g., Duplex, Studio, etc."
          />
        </div>

        {/* Location */}
        <div className="flex flex-col flex-1">
          <label className="block text-base font-semibold mb-2 text-black">Location</label>
          <input
            className="w-full border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Molyko, Check Point"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col flex-[2]">
          <label className="block text-base font-semibold mb-2 text-black">Description</label>
          <textarea
            className="w-full border border-purple-600 rounded-lg px-4 py-4 resize-none focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400 h-full"
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
            placeholder="Provide a short description of the house"
          />
        </div>

        {/* Rent Price */}
        <div className="flex flex-col flex-1">
          <label className="block text-base font-semibold mb-2 text-black">Rent Price</label>
          <input
            className="w-full border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400"
            type="number"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            placeholder="e.g., 85000"
          />
        </div>

        {/* Discount */}
        <div className="flex flex-col flex-1">
          <label className="block text-base font-semibold mb-2 text-black">Discount</label>
          <input
            className="w-full border border-purple-600 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-700 text-black placeholder:text-gray-400"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="e.g., 5000"
          />
        </div>
      </div>
    </div>
  );
};

export default HouseDetailsForm;
