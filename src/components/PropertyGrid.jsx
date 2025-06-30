import React from "react";

const PropertyGrid = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
      {properties.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col transition hover:shadow-xl"
        >
          <div className="relative">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <span className="absolute top-3 left-3 bg-black bg-opacity-80 text-white px-4 py-1 rounded-full text-base font-bold">
              {p.price}
            </span>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-semibold text-lg text-black mb-1">{p.title}</h3>
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <svg className="w-4 h-4 mr-1 text-[#a259ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              {p.address}
            </div>

            <div className="flex items-center gap-4 text-gray-700 text-sm mt-auto">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[#a259ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="7" width="18" height="13" rx="2"/>
                  <path d="M16 3v4"/>
                </svg>
                {p.sqft} Sq.
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[#a259ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                {p.beds} Beds
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[#a259ff]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 21V8a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v13"/>
                  <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/>
                </svg>
                {p.baths} Baths
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyGrid;
