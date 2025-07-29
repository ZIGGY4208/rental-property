import React from 'react';
import { motion } from 'framer-motion';
import propertyData from './data/propertyData';

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

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {propertyData.map((property, index) => (
          <motion.div
            key={property.id}
            className="relative p-4 rounded-2xl bg-white/30 backdrop-blur-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {/* Badge */}
            {property.badge && (
              <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                {property.badge}
              </span>
            )}

            {/* Image */}
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{property.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{property.location}</p>

            {/* Price */}
            <p className="text-purple-600 font-bold text-sm">{property.price}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SearchByRequirement;
