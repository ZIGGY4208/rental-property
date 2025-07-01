import React from "react";
import { ArrowRight, Archive } from "lucide-react"; // icon library

const HouseUploadHeader = ({ onUpload }) => (
  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-4 border-b border-gray-200">
    <div>
      <h1 className="text-3xl font-bold text-black mb-1">Upload House </h1>
      <p className="text-gray-500 text-sm">
        Post and manage your property listings in Buea.
      </p>
    </div>

    <div className="flex gap-3 mt-4 md:mt-0">
      <button className="flex items-center gap-2 border border-purple-600 rounded-lg px-5 py-2 bg-white text-purple-700 font-semibold hover:bg-purple-50 transition duration-200">
        <Archive size={16} />
        Archive Listing
      </button>
      <button
        onClick={onUpload}
        className="flex items-center gap-2 rounded-lg px-5 py-2 bg-purple-700 text-white font-semibold hover:bg-purple-800 transition duration-200"
      >
        Upload House <ArrowRight size={16} />
      </button>
    </div>
  </div>
);

export default HouseUploadHeader;
