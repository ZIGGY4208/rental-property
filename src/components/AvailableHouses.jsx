import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import housesData from "./data/houses";
import HouseCard from "./HouseCard";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";

// Utility to get filters from query parameters
const getFiltersFromQuery = (locationSearch) => {
  const params = new URLSearchParams(locationSearch);
  const filters = {
    type: params.get("type") || "",
    location: params.get("location") || "",
    price: parseInt(params.get("price")) || null,
  };
  console.log("📦 Extracted filters from URL:", filters);
  return filters;
};

const AvailableHouses = () => {
  const [filtered, setFiltered] = useState(housesData);
  const [visibleCount, setVisibleCount] = useState(9);
  const location = useLocation();

  const applyFilters = ({ type, location, price }) => {
    console.log("🔍 Applying filters:", { type, location, price });

    const priceMargin = 10000; // Internal flexible margin (+/-10,000)

    const result = housesData.filter((house) => {
      const matchesType = type ? house.type === type : true;
      const matchesLocation = location ? house.location === location : true;
      const matchesPrice =
        price !== null
          ? house.price >= price - priceMargin && house.price <= price + priceMargin
          : true;

      return matchesType && matchesLocation && matchesPrice;
    });

    console.log("🏘️ Filtered results:", result);
    setFiltered(result);
    setVisibleCount(9);
  };

  // Load filters from query params on mount or URL change
  useEffect(() => {
    const filters = getFiltersFromQuery(location.search);
    applyFilters(filters);
  }, [location.search]);

  const loadMore = () => {
    console.log("📥 Loading more houses...");
    setVisibleCount((prev) => prev + 9);
  };

  return (
    <section className="p-4 bg-white min-h-screen text-black">
      {/* Top search bar */}
      <SearchBar
        onSearch={(keyword) =>
          applyFilters({
            type: "",
            location: "",
            price: null,
            keyword,
          })
        }
      />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Left sidebar with filters */}
        <aside className="md:w-1/4">
          <FilterSidebar
            onFilterChange={applyFilters}
            initialFilters={getFiltersFromQuery(location.search)}
          />
        </aside>

        {/* House results or fallback message */}
        <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">
              😢 No houses match your search. Try adjusting the filters.
            </div>
          ) : (
            filtered.slice(0, visibleCount).map((house) => (
              <HouseCard key={house.id} house={house} />
            ))
          )}
        </main>
      </div>

      {/* Load More Button */}
      {visibleCount < filtered.length && (
        <div className="text-center mt-8">
          <button
            onClick={loadMore}
            className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default AvailableHouses;
