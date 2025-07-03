import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, CalendarCheck } from "lucide-react";
import houses from "./data/houses";
import RelatedHouses from "../components/RelatedHouses";
import ContactForm from "./ContactForm";

export default function HouseDetailsPage() {
  const { id } = useParams();
  const house = houses.find((h) => h.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const contactRef = useRef();
  const [highlighted, setHighlighted] = useState(false);
  const [toast, setToast] = useState("");

  if (!house) {
    return <p className="text-center mt-20 text-red-600">House not found.</p>;
  }

  const related = houses
    .filter((h) => h.location === house.location && h.id !== house.id)
    .slice(0, 4);

  const generateEssayDetails = (amenities) => {
    const getSectionText = (key, items) => {
      const section = key.replace(/([A-Z])/g, " $1").toLowerCase();
      return `The ${section} includes ${items.join(", ").toLowerCase()}.`;
    };

    return Object.entries(amenities || {})
      .map(([key, items]) => getSectionText(key, items))
      .join(" ");
  };

  const handleScrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });

    // Add a slight delay to trigger toast & highlight after scroll
    setTimeout(() => {
      setHighlighted(true);
      setToast("📬 You're now ready to book your appointment.");

      // Remove highlight after 2.5s
      setTimeout(() => setHighlighted(false), 2500);

      // Remove toast after 3.5s
      setTimeout(() => setToast(""), 3500);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white text-black relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded shadow-lg z-50 transition duration-300">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <img
            src={house.gallery?.[selectedImage] || house.image}
            alt="Main"
            className="w-full h-72 object-cover rounded-xl border"
          />
          <div className="flex space-x-2 mt-4">
            {(house.gallery || []).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setSelectedImage(idx)}
                className={`h-16 w-20 object-cover rounded cursor-pointer border ${
                  selectedImage === idx ? "border-purple-600" : "border-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-purple-700 mb-1">{house.type}</h1>
          <p className="text-gray-600 mb-4">{house.location}</p>

          <div className="flex items-center gap-4 mb-4">
            <img
              src={house.postedBy?.profilePic}
              alt={house.postedBy?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{house.postedBy?.name}</p>
              <p className="text-sm text-gray-600">{house.postedBy?.phone}</p>
              <div className="flex items-center text-yellow-500 text-sm">
                {Array.from({ length: Math.floor(house.postedBy?.rating || 0) }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" stroke="none" />
                ))}
                <span className="ml-2">
                  {house.postedBy?.rating} ({house.postedBy?.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="text-2xl font-bold text-purple-600 mb-6">
            FCFA {house.price.toLocaleString()} <span>/Month</span>
          </div>

          {/* Book an Appointment Button */}
          <button
            onClick={handleScrollToContact}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow flex items-center gap-2 transition"
          >
            <CalendarCheck size={18} /> Book an Appointment
          </button>
        </div>
      </div>

      {/* Property Details in Essay Style */}
      <div className="mt-14 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Property Details</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {house.description} {generateEssayDetails(house.amenities)}
        </p>
      </div>

      {/* Contact Form Section (scroll target) */}
      <div
        ref={contactRef}
        className={`mt-20 transition-all duration-500 ${
          highlighted ? "ring-4 ring-purple-400 rounded-xl" : ""
        }`}
      >
        <ContactForm />
      </div>

      {/* Related Houses */}
      <RelatedHouses
        houses={related}
        title={`Related Houses in ${house.location}`}
      />
    </div>
  );
}
