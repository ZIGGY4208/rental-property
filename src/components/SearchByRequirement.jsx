// SearchByRequirement.jsx
import React from "react";
import { motion } from "framer-motion";
import propertyData from "./data/propertyData";

// Animation variants for the cards
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const SearchByRequirement = () => {
  return (
    <section className="py-12 px-4 bg-white">
      {/* Section header */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center text-xs font-semibold text-purple-500 uppercase tracking-wide"
      >
        Happy Letter
      </motion.h3>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center text-2xl sm:text-3xl font-bold text-black mb-10"
      >
        Search By Property Requirement
      </motion.h2>

      {/* Horizontal scroll on small screens, grid on medium+ */}
      <div className="w-full max-w-6xl mx-auto overflow-x-auto md:overflow-x-visible">
        <div className="grid grid-flow-col md:grid-flow-row auto-cols-[80%] md:grid-cols-3 gap-6">
          {propertyData.map((property, index) => (
            <motion.div
              key={property.id}
              className="relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/20 flex-shrink-0"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              {/* Background image */}
              <img
                src={property.image}
                alt={property.name}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black opacity-30"></div>

              {/* Text content */}
              <div className="relative z-10 flex flex-col justify-end h-full p-4">
                <h3 className="text-white text-lg sm:text-xl font-bold">{property.name}</h3>
                <p className="text-white text-sm">{property.location || "Location not set"}</p>
                <p className="text-purple-200 font-semibold text-sm">
                  {property.price || "Price on request"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchByRequirement;   
