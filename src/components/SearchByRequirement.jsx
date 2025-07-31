// SearchByRequirement.jsx
// This component displays a grid of property requirement cards,
// each with an animated entrance using Framer Motion.
// Cards use property images as backgrounds with overlaid text content.

import React from 'react';
import { motion } from 'framer-motion';
import propertyData from './data/propertyData';

// Animation variants for the cards using framer-motion
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

const SearchByRequirement = () => {
  return (
    <section className="py-16 px-4 bg-white">
      {/* Section title and subtitle with fade-in animation */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-xs font-semibold text-purple-500 uppercase tracking-wide"
      >
        Happy Letter
      </motion.h3>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center text-2xl font-bold text-black mb-12"
      >
        Search By Property Requirement
      </motion.h2>

      {/* Responsive grid layout for property cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {propertyData.map((property, index) => (
          // Animated card with unique key
          <motion.div
            key={property.id}
            className="relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {/* Full-size background image */}
            <img
              src={property.image}
              alt={property.name}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Semi-transparent overlay to improve text readability */}
            <div className="absolute inset-0 bg-black opacity-30"></div>

            {/* Text content over the image */}
            <div className="relative z-10 flex flex-col justify-end h-full p-4">
              <h3 className="text-white text-xl font-bold">{property.name}</h3>
              <p className="text-white text-sm">{property.location || 'Location not set'}</p>
              <p className="text-purple-200 font-semibold text-sm">{property.price || 'Price on request'}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SearchByRequirement;
