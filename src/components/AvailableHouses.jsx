import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import housesData from "./data/houses";
import HouseCard from "./HouseCard";
import FilterSidebar from "./FilterSidebar";
import SearchBar from "./SearchBar";
import { Plus } from "lucide-react";

const getFiltersFromQuery = (locationSearch) => {
  const params = new URLSearchParams(locationSearch);
  return {
    type: params.get("type") || "",
    location: params.get("location") || "",
    price: parseInt(params.get("price")) || null,
  };
};

const AvailableHouses = () => {
  const [filtered, setFiltered] = useState(housesData);
  const [visibleCount, setVisibleCount] = useState(9);
  const location = useLocation();
  const navigate = useNavigate();
  const observerRef = useRef(null); // To hold the IntersectionObserver
  const sentinelRef = useRef(null); // This is the element we'll watch

  const applyFilters = ({ type, location, price }) => {
    const priceMargin = 10000;
    const result = housesData.filter((house) => {
      const matchesType = type ? house.type === type : true;
      const matchesLocation = location ? house.location === location : true;
      const matchesPrice =
        price !== null
          ? house.price >= price - priceMargin && house.price <= price + priceMargin
          : true;
      return matchesType && matchesLocation && matchesPrice;
    });

    setFiltered(result);
    setVisibleCount(9);
  };

  useEffect(() => {
    const filters = getFiltersFromQuery(location.search);
    applyFilters(filters);
  }, [location.search]);

  // Infinite scroll logic
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => {
          if (prev < filtered.length) {
            return prev + 9; // Load 9 more houses
          }
          return prev;
        });
      }
    });

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [filtered]);

  return (
    <section className="p-4 bg-white min-h-screen text-black">
      {/* Top search bar and Add House button */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
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

        <button
          onClick={() => navigate("/Admin")}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          <Plus size={18} />
          Add Listing
        </button>
      </div>

      {/* Filters and Listings */}
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <aside className="md:w-1/4 max-w-sm">
          <FilterSidebar
            onFilterChange={applyFilters}
            initialFilters={getFiltersFromQuery(location.search)}
          />
        </aside>

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

      {/* Sentinel for infinite scroll */}
      <div ref={sentinelRef} className="h-10"></div>
    </section>
  );
};

export default AvailableHouses;
