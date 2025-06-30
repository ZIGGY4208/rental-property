import React, { useState, useEffect } from 'react';
import PropertySlider from './PropertySlider';
import propertyData from './data/propertyData';

const SearchByRequirement = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(1);

  useEffect(() => {
    const updateDotsCount = () => {
      const cardWidth = 176;
      const containerWidth = window.innerWidth - 32;
      const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
      const pages = Math.ceil(propertyData.length / cardsPerView);
      setDotsCount(pages);
    };

    updateDotsCount();
    window.addEventListener('resize', updateDotsCount);
    return () => window.removeEventListener('resize', updateDotsCount);
  }, []);

  return (
    <section className="py-10 px-4 bg-white">
      <h3 className="text-center text-xs font-semibold text-purple-500 uppercase tracking-wide">
        Happy Letter
      </h3>
      <h2 className="text-center text-2xl font-bold text-black mb-8">
        Search By Property Requirement
      </h2>

      <PropertySlider
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        dotsCount={dotsCount}
      />

      {/* Pagination Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: dotsCount }).map((_, idx) => (
          <span
            key={idx}
            className={`transition-all rounded-full ${
              idx === activeIndex
                ? 'bg-purple-600 w-4 h-4'
                : 'bg-gray-300 w-2 h-2'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default SearchByRequirement;
