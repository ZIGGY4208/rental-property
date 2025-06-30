// src/components/homepage/StatsSection.jsx
import React from 'react';
import { Star } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className=" w-1/2 bg-purple-50 ">
      <div className="  grid grid-cols-1 md:grid-cols-3 gap-2 text-center">
        {/* Total Properties */}
        <div className="shadow-md p-2 flex rounded-lg items-center">
          <h3 className="text-sm font-bold text-purple-700">150+</h3>
          <p className="text-gray-700 mt-2 text-sm">Student-Friendly Properties</p>
        </div>

        {/* Total Landlords */}
        <div className="shadow-md p-2 flex rounded-lg">
          <h3 className="text-sm font-bold text-purple-700">60+</h3>
          <p className="text-gray-700 mt-2">Verified Landlords in Buea</p>
        </div>

        {/* 6 Star Reviews */}
        <div className="shadow-md p-2 flex rounded-lg">
          <div className="flex justify-center mb-2">
            {[...Array(6)].map((_, i) => (
              <Star key={i} className="text-yellow-400" size={10} fill="currentColor" />
            ))}
          </div>
          <p className="text-gray-700 text-sm">Top-rated for ease, trust, and satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
