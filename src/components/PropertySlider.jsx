import React, { useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';
import propertyData from './data/propertyData';

const cardWidth = 176;

const PropertySlider = ({ activeIndex, setActiveIndex, dotsCount }) => {
  const containerRef = useRef(null);
  const isHoveredRef = useRef(false);

  const getCardsPerView = () => {
    const containerWidth = window.innerWidth - 32;
    return Math.floor(containerWidth / cardWidth) || 1;
  };

  const scrollToIndex = useCallback(
    (index) => {
      const maxIndex = dotsCount - 1;
      const safeIndex = Math.min(Math.max(index, 0), maxIndex);
      setActiveIndex(safeIndex);
    },
    [dotsCount, setActiveIndex]
  );

  const scrollLeft = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const scrollRight = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') scrollLeft();
      else if (e.key === 'ArrowRight') scrollRight();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [scrollLeft, scrollRight]);

  const offset = -(activeIndex * getCardsPerView() * cardWidth);

  return (
    <div
      className="relative"
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
    >
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        disabled={activeIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronLeft size={32} className="text-purple-600" />
      </button>

      {/* Cards Container */}
      <div className="overflow-hidden px-2 pb-4" ref={containerRef}>
        <div
          className="flex gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {propertyData.map((item, index) => (
            <PropertyCard
              key={index}
              name={item.name}
              count={item.count}
              image={item.image} // ✅ Now passing the image to the card
            />
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        disabled={activeIndex === dotsCount - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-30"
      >
        <ChevronRight size={32} className="text-purple-600" />
      </button>
    </div>
  );
};

export default PropertySlider;
