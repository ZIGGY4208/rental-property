import React, { useState } from "react";
import {
  Home,
  KeyRound,
  BedDouble,
  MapPin,
  Ruler,
  Bath,
  Clock4,
} from "lucide-react";

// Sample Buea Rental Data
const properties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    price: "₣120,000 / Month",
    title: "3-Bedroom Apartment, Molyko",
    address: "Malingo Street, Molyko, Buea",
    sqft: "2,000",
    beds: 3,
    baths: 2,
    type: "For Rent",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    price: "₣80,000 / Month",
    title: "2-Bedroom Apartment, Checkpoint",
    address: "Checkpoint, Buea",
    sqft: "1,600",
    beds: 2,
    baths: 2,
    type: "For Rent",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    price: "₣15,000 / Night",
    title: "Furnished Studio, Sandpit",
    address: "Sandpit Junction, Buea",
    sqft: "750",
    beds: 1,
    baths: 1,
    type: "Short Stay",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600607682313-4d1ef9af12f5?auto=format&fit=crop&w=800&q=80",
    price: "₣100,000 / Month",
    title: "Family Flat, Great Soppo",
    address: "Presbyterian Church Road, Soppo, Buea",
    sqft: "1,800",
    beds: 3,
    baths: 2,
    type: "For Rent",
  },
];

// Categories (Rentals only)
const categories = [
  { label: "All Rentals", value: "All", icon: <Home size={16} /> },
  { label: "Long Term", value: "For Rent", icon: <KeyRound size={16} /> },
  { label: "Short Stay", value: "Short Stay", icon: <Clock4 size={16} /> },
];

export default function ComfortLivingSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = selectedCategory === "All"
    ? properties
    : properties.filter((p) => p.type === selectedCategory);

  return (
    <section className="py-12 px-4 min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          {/* <p className="uppercase text-purple-600 font-semibold text-sm tracking-wide">Zion Cite - Buea Rentals</p> */}
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
            Rent a Home in Buea Without Stress
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Whether you're a student, worker, or visitor, our platform helps you find apartments and studios in Buea without walking miles or calling agents at 11PM. We bring the listings to your fingertips.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition 
                ${selectedCategory === cat.value
                  ? "bg-purple-600 text-white shadow"
                  : "bg-white text-black border border-gray-200 hover:bg-purple-100"}`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
              <div className="relative">
                <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
                <span className="absolute top-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
                  {p.price}
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-lg font-bold text-black">{p.title}</h3>
                <p className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-purple-600 mr-1" />
                  {p.address}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-700 mt-3">
                  <span className="flex items-center">
                    <Ruler className="w-4 h-4 mr-1 text-purple-600" />
                    {p.sqft} Sqft
                  </span>
                  <span className="flex items-center">
                    <BedDouble className="w-4 h-4 mr-1 text-purple-600" />
                    {p.beds} Beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="w-4 h-4 mr-1 text-purple-600" />
                    {p.baths} Baths
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-10 gap-2">
          <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        </div>
      </div>
    </section>
  );
}
