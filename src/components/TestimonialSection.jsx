import React, { useRef, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "./data/testimonialsData";
import { motion } from "framer-motion";

export default function TestimonialSection() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center relative">
        {/* Heading */}
        <motion.h2
          className="text-3xl font-bold text-black mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What HabiLink Users Are Saying
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Real stories from Buea residents who found homes faster and smarter
          using HabiLink.
        </motion.p>

        {/* Slider container */}
        <div className="relative">
          {/* Left button */}
          <motion.button
            onClick={scrollLeft}
            whileTap={{ scale: 0.9 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 z-10"
          >
            <ChevronLeft size={24} />
          </motion.button>

          {/* Scrollable content */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-hidden snap-x snap-mandatory scroll-smooth pb-4"
          >
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} testimonial={t} index={i} />
            ))}
          </div>

          {/* Right button */}
          <motion.button
            onClick={scrollRight}
            whileTap={{ scale: 0.9 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg p-3 rounded-full hover:bg-gray-100 z-10"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }) {
  const [rating, setRating] = useState(testimonial.rating); // default rating

  return (
    <motion.div
      className="bg-white min-w-[85%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%] 
      rounded-2xl shadow-md hover:shadow-xl transition p-6 text-left snap-start"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center gap-4 mb-4">
        <motion.img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <div>
          <h4 className="font-semibold text-black">{testimonial.name}</h4>
          <span className="text-sm text-gray-500">{testimonial.location}</span>
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-4">“{testimonial.comment}”</p>

      {/* Interactive stars */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setRating(idx + 1)} // set rating on click
            whileTap={{ scale: 0.9 }}
            className="focus:outline-none"
          >
            <Star
              size={20}
              fill={idx < rating ? "#a259ff" : "lightgray"}
              stroke="none"
              className="transition-transform duration-200 hover:scale-110"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
