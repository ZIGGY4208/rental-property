import React, { useState, useEffect } from "react";
import {
  Home,
  KeyRound,
  Clock4,
  MapPin,
  Ruler,
  BedDouble,
  Bath,
  DollarSign,
  Key,
  Bed,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { properties, categories as rawCategories } from "./data/ComfortLivingData";

// Map category icon strings to actual icon components
const iconMap = {
  Home: <Home size={16} />,
  DollarSign: <DollarSign size={16} />,
  Key: <Key size={16} />,
  Bed: <Bed size={16} />,
};

// Add icons to categories
const categories = rawCategories.map((cat) => ({
  ...cat,
  icon: iconMap[cat.icon] || null,
}));

export default function ComfortLivingSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  // Filter properties by category and search term
  const filtered = properties
    .filter(
      (p) => selectedCategory === "All" || p.type === selectedCategory
    )
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Pagination slice
  const paginatedProperties = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Total pages for pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // Reset page to 1 when filters/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  // Clear filters
  function clearFilters() {
    setSelectedCategory("All");
    setSearchTerm("");
  }

  return (
    <section className="py-12 px-4 min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-black mt-2">
            Rent a Home in Buea Without Stress
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Whether you're a student, worker, or visitor, our platform helps you
            find apartments and studios in Buea without walking miles or calling
            agents at 11PM. We bring the listings to your fingertips.
          </p>
        </div>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-6 px-4">
          <input
            type="text"
            placeholder="Search by title or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            aria-label="Search properties by title or address"
          />
        </div>

        {/* Clear Filters Button */}
        {(selectedCategory !== "All" || searchTerm) && (
          <div className="flex justify-center mb-6 px-4">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
              aria-label="Clear filters"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 px-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition 
                ${
                  selectedCategory === cat.value
                    ? "bg-purple-600 text-white shadow"
                    : "bg-white text-black border border-gray-200 hover:bg-purple-100"
                }`}
              role="button"
              aria-pressed={selectedCategory === cat.value}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* No results */}
        {paginatedProperties.length === 0 ? (
          <p className="text-center text-gray-500 text-lg px-4">
            No properties found for this filter or search.
          </p>
        ) : (
          // Adding key on this container to re-trigger animation on filtered or page change
          <div
            key={`${selectedCategory}-${searchTerm}-${currentPage}`}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 animate-fadeIn"
          >
            {paginatedProperties.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-40 object-cover"
                  />
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
        )}

        {/* Pagination Controls */}
        {filtered.length > itemsPerPage && (
          <div className="flex justify-center mt-10 gap-4 items-center px-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
              Prev
            </button>
            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1 px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-purple-600 text-white hover:bg-purple-700"
              }`}
              aria-label="Next page"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* CSS for fade-in animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
