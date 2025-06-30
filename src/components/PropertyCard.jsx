import React from 'react';

const PropertyCard = ({ name, count, image }) => {
  return (
    <div className="min-w-[160px] bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center space-y-2 hover:scale-105 transition-transform">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover rounded-xl mb-3"
      />
      <h4 className="font-bold text-black">{name}</h4>
      <p className="text-gray-500 text-sm">{count} properties</p>
    </div>
  );
};

export default PropertyCard;
