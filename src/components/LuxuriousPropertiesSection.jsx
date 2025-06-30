import React from "react";

// Replace with real estate avatars later
const avatars = [
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
];

export default function LuxuriousPropertiesSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE - PROPERTY IMAGES */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[24px] overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Modern apartment exterior"
              className="object-cover w-full h-60 sm:h-64 md:h-72"
            />
          </div>

          <div className="relative rounded-[24px] overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80"
              alt="Luxury property"
              className="object-cover w-full h-60 sm:h-64 md:h-72"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md rounded-full flex items-center px-4 py-2 gap-2">
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
              <span className="text-white text-sm ml-2">Thousands Trust Us</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - INFORMATION & VALUE */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">
              Why Choose Us
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-black leading-tight">
              Find Your Perfect Home —<br /> Without the Night Struggles
            </h2>
            <p className="mt-4 text-gray-700 text-base max-w-xl leading-relaxed">
              Our platform is built to take away the stress of house-hunting in dangerous hours. 
              Say goodbye to walking streets at 10PM searching for houses.
              <br /><br />
              Whether you need a studio, self-contain, or duplex — our smart filters,
              verified listings, and instant contact options get you what you need.
            </p>
          </div>

          {/* HIGHLIGHTS */}
          <ul className="space-y-4 text-gray-700 text-sm pl-4 list-disc">
            <li>Verified houses in your location</li>
            <li>Instant contact with landlords or agents</li>
            <li>Smart search filters to find what suits you</li>
            <li>No more late-night search runs</li>
          </ul>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow transition">
              Start Your Search
            </button>
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg width="24" height="24" fill="none" stroke="#a259ff" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.88 19.88 0 0 1-8.63-3.13A19.5 19.5 0 0 1 3.13 8.81 19.88 19.88 0 0 1 0 2.18 2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72c.13 1.11.37 2.18.7 3.21a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 7.08 7.08l1.27-1.27a2 2 0 0 1 2.11-.45c1.03.33 2.1.57 3.21.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="text-black font-semibold text-base">Call Us Anytime</div>
                <div className="text-gray-600 text-sm">+00 123 456789</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
