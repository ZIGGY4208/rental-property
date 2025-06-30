import React, { useState } from "react"; // Import React and useState hook
import housesData from "./data/houses"; // Import the dummy house data
import HouseCard from "./HouseCard"; // Component to display each house
import FilterSidebar from "./FilterSidebar"; // Sidebar filter component
import SearchBar from "./SearchBar"; // Top search bar component

// Main component to display and filter available houses
const AvailableHouses = () => {
  const [filtered, setFiltered] = useState(housesData); // Stores filtered house list
  const [visibleCount, setVisibleCount] = useState(9); // Number of visible houses

  // Function to filter houses based on filters or keyword search
  const applyFilters = ({ type, location, minPrice, maxPrice, keyword }) => {
    const result = housesData.filter((house) => {
      const matchesType = type ? house.type === type : true; // Filter by type
      const matchesLocation = location ? house.location === location : true; // Filter by location
      const matchesPrice = house.price >= minPrice && house.price <= maxPrice; // Filter by price range
      const matchesKeyword = keyword
        ? `${house.type} ${house.location} ${house.postedBy}`.toLowerCase().includes(keyword.toLowerCase()) // Keyword search
        : true;

      return matchesType && matchesLocation && matchesPrice && matchesKeyword; // All filters must pass
    });

    setFiltered(result); // Update filtered houses
    setVisibleCount(9); // Reset visible count when filters are applied
  };

  // Function to show more houses when "Load More" is clicked
  const loadMore = () => {
    setVisibleCount((prev) => prev + 9); // Increase visible count by 9
  };

  return (
    <section className="p-4 bg-white min-h-screen text-black">
      {/* Top search bar */}
      <SearchBar
        onSearch={(keyword) =>
          applyFilters({ type: '', location: '', minPrice: 0, maxPrice: Infinity, keyword })
        }
      />

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {/* Left sidebar with filters */}
        <aside className="md:w-1/4">
          <FilterSidebar onFilterChange={applyFilters} />
        </aside>

        {/* House results on the right */}
        <main className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, visibleCount).map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
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

export default AvailableHouses; // Export component
