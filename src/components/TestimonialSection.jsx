import React from "react";
import { Star } from "lucide-react";

// Testimonials for HabiLink
const testimonials = [
  {
    name: "Nkechi B.",
    location: "Molyko, Buea",
    rating: 5,
    comment:
      "I used to roam the streets late at night looking for a place. HabiLink made it so easy — I found my apartment in minutes!",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    name: "Tanyi Elvis",
    location: "Sandpit, Buea",
    rating: 4,
    comment:
      "The listings are legit, and I love that I didn’t have to pay any agent first. I recommend it to any student.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Delphine M.",
    location: "Bonduma, Buea",
    rating: 5,
    comment:
      "HabiLink saved me so much stress. I found a short-stay room for my cousin visiting from Douala. So convenient!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Etienne N.",
    location: "Check Point, Buea",
    rating: 4,
    comment:
      "With HabiLink, I no longer rely on agents who charge me for nothing. Everything I needed was right on the platform.",
    avatar: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Fonkwa Mary",
    location: "Wotolo, Buea",
    rating: 5,
    comment:
      "As a single mom, house hunting was a nightmare. HabiLink helped me secure a peaceful home within 48 hours!",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-black mb-4">
          What HabiLink Users Are Saying
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Real stories from Buea residents who found homes faster and smarter using HabiLink.
        </p>

        {/* Slider container */}
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white min-w-[85%] md:min-w-0 rounded-2xl shadow-md hover:shadow-lg transition p-6 text-left snap-start"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-black">{t.name}</h4>
                  <span className="text-sm text-gray-500">{t.location}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-4">“{t.comment}”</p>
              <div className="flex items-center gap-1 text-[#a259ff]">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    fill="#a259ff"
                    stroke="none"
                    className="text-purple-600"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
