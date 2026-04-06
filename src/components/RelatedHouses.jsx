import React from "react";
import { useNavigate } from "react-router-dom";

export default function RelatedHouses({ houses, title }) {
  const navigate = useNavigate();

  if (!houses?.length) return null;

  return (
    <div className="mt-16">
      <h3 className="text-xl font-semibold text-center mb-2">
        {title}
      </h3>
      <div className="flex justify-center mb-6">
        <span className="h-1 bg-purple-600 w-12 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {houses.map((house) => (
          <div
            key={house.id}
            onClick={() => navigate(`/houses/${house.id}`)}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={house.image}
              alt={house.type}
              className="w-full h-36 object-cover mb-2 rounded"
            />
            <p className="text-xs text-gray-500">
              {house.type} - {house.location}
            </p>
            <p className="font-semibold text-sm truncate">
              By {house.postedBy?.name}
            </p>
            <div className="text-purple-600 font-bold mt-1 text-sm">
              FCFA {house.price.toLocaleString()} <span>/Mouth</span>
            </div>
            <p className="mt-1 text-sm text-purple-700 hover:underline">
              View Details
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
