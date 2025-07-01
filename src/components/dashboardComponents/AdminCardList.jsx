import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const admins = [
  {
    name: "Mr. Bobe",
    role: "Platform Manager",
    location: "Buea, Molyko",
    availability: "9AM - 6PM",
    image: "ai.jpg",
  },
  {
    name: "Ms. Laura",
    role: "User Support",
    location: "Buea, Bonduma",
    availability: "10AM - 5PM",
    image: "ai.jpg",
  },
  {
    name: "John Ekane",
    role: "Listings Supervisor",
    location: "Buea, Mile 16",
    availability: "8AM - 4PM",
    image: "ai.jpg",
  },
  {
    name: "Nora Tabe",
    role: "Finance Officer",
    location: "Buea, Soppo",
    availability: "9AM - 5PM",
    image: "ai.jpg",
  },
];

const AdminCard = ({ admin }) => (
  <div className="bg-white rounded-xl shadow px-6 py-8 flex flex-col items-center text-center w-full transition duration-500 ease-in-out">
    <span className="text-sm text-purple-600 font-semibold mb-1">Currently Active</span>
    <span className="text-xs text-gray-400 mb-2">Posted from: {admin.location}</span>
    <img
      src={admin.image}
      alt={admin.name}
      className="w-20 h-20 rounded-full object-cover mb-3"
    />
    <span className="font-semibold text-gray-700 text-base">{admin.name}</span>
    <span className="text-xs text-gray-400 mb-1">{admin.role}</span>
    <span className="text-xs font-semibold text-gray-500">
      Responds between {admin.availability}
    </span>
  </div>
);

const AdminSlider = () => {
  const [current, setCurrent] = useState(0);
  const total = admins.length;

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-purple-600 hover:text-purple-800"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="overflow-hidden">
        <div className="w-full transition-transform duration-500 ease-in-out">
          <AdminCard admin={admins[current]} />
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 text-purple-600 hover:text-purple-800"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

export default AdminSlider;
