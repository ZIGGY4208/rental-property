import React from 'react';
// import HouseMap from '../HouseMap';
import houses from '../data/houses';
import HouseMap from '../HouseMap';
// import houses from '../../data/houses'; // ✅ Adjust this path based on your project structure

const Location = () => (
  <div className="p-3">
    <h1 className="text-2xl font-bold mb-2">Browse by Location</h1>
    <p className="text-gray-600 mb-6">View Houses in Buea neighborhoods.</p>
    
    {/* ✅ Pass the houses as a prop */}
    <HouseMap houses={houses} />
  </div>
);

export default Location;
