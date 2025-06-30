import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, PhoneCall } from "lucide-react";
import houses from "./data/houses";

const HouseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const house = houses.find((h) => h.id === parseInt(id));

  if (!house) {
    return <p className="text-center mt-20 text-red-600">House not found.</p>;
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 py-12 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-700 mb-2">{house.type}</h1>
      <p className="text-gray-600 mb-4">{house.location}</p>

      {/* Images */}
      <img
        src={house.image}
        alt={house.type}
        className="w-full h-64 object-cover rounded-xl shadow mb-6"
      />

      {/* Price & Poster */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <p className="text-2xl font-bold text-purple-600">
          FCFA {house.price.toLocaleString()}
        </p>
        <div className="flex items-center gap-4">
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
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-700">{house.description}</p>
      </div>

      {/* Inspection Checklist */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-purple-700 mb-4">
          Inspection Checklist
        </h2>
        {Object.entries(house.amenities || {}).map(([section, items]) => (
          <div key={section} className="mb-5">
            <h3 className="font-semibold text-black capitalize mb-1">
              {section.replace(/([A-Z])/g, " $1")}
            </h3>
            <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
              {items.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="bg-purple-100 p-6 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-purple-700 mb-1">Interested in this house?</h3>
          <p className="text-gray-700">Contact the poster directly to schedule a visit or ask questions.</p>
        </div>
        <button
          onClick={() =>
            navigate("/contact", {
              state: { fromHouse: { type: house.type, location: house.location } },
            })
          }
          className="mt-4 sm:mt-0 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow flex items-center gap-2 transition"
        >
          <PhoneCall size={18} /> Contact Now
        </button>
      </div>
    </div>
  );
};

export default HouseDetailsPage;
