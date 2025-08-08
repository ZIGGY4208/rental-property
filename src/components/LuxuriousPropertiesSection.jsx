import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react"; // Optional icon library

const avatars = [
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
];

export default function LuxuriousPropertiesSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative rounded-[24px] overflow-hidden shadow-lg"
        >
          <img
            src="/3cde.png"
            alt="Luxurious property"
            className="object-center w-full h-[600px]"
          />
          <div
            className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center px-4 py-2 gap-2 cursor-pointer transition hover:scale-105 active:scale-95"
            onClick={() => alert("Over 99+ users trust this platform!")}
          >
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`user-avatar-${i}`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
              <div className="w-8 h-8 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                +99
              </div>
            </div>
            <span className="text-white text-sm ml-2 hidden sm:inline">
              Thousands Trust Us
            </span>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col gap-8"
        >
          <div>
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
              Why Choose Us
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-black leading-tight">
              Find Your Perfect Home —<br /> Without the Night Struggles
            </h2>

            {/* Search Input Preview */}
            <input
              type="text"
              placeholder="Search 2-bedroom in Douala..."
              className="mt-4 px-4 py-2 w-full sm:w-[300px] border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <p className="mt-4 text-gray-700 text-base max-w-xl leading-relaxed">
              Our platform is built to take away the stress of house-hunting in dangerous hours. 
              Say goodbye to walking streets at 10PM searching for houses.
              <br /><br />
              Whether you need a studio, self-contain, or duplex — our smart filters,
              verified listings, and instant contact options get you what you need.
            </p>
          </div>

          <ul className="space-y-4 text-gray-700 text-sm pl-4 list-disc">
            <li>Verified houses in your location</li>
            <li>Instant contact with landlords or agents</li>
            <li>Smart search filters to find what suits you</li>
            <li>No more late-night search runs</li>
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow transition">
              Start Your Search
            </button>

            <button
              onClick={() => alert("Redirect to contact section")}
              className="flex items-center gap-2 text-purple-600 border border-purple-600 font-medium px-5 py-2.5 rounded-full hover:bg-purple-600 hover:text-white transition"
            >
              <MessageCircle size={18} />
              Contact Us
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
