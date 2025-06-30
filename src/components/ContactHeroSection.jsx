import React from "react";
import { motion } from "framer-motion"; // ✅ Import used below

void motion; 
const ContactHeroSection = () => (
  <div
    className="relative h-[340px] sm:h-[450px] md:h-[550px] lg:h-[600px] bg-cover bg-center"
    style={{ backgroundImage: "url('/day.jpg')" }}
  >
    {/* Overlay with centered animated content */}
    <div className="absolute inset-0 bg-black opacity-60 flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-white text-4xl sm:text-5xl font-bold">
          Talk to <span className="text-purple-500">HabiLink</span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white mt-4 text-lg"
        >
          We're here to assist landlords and tenants alike.
        </motion.p>
      </motion.div>
    </div>
  </div>
);

export default ContactHeroSection;
