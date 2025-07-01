import React from "react";
import { useNavigate } from "react-router-dom";

const HouseCard = ({ house }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/houses/${house.id}`, { state: { house } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white text-black shadow rounded-lg overflow-hidden p-4 hover:shadow-md transition cursor-pointer"
    >
      {/* House Image */}
      <img
        src={house.image}
        alt={`${house.type} in ${house.location}`}
        className="w-full h-40 object-cover rounded mb-3"
      />

      {/* House Type */}
      <h3 className="font-bold text-lg mb-1">{house.type}</h3>

      {/* Location */}
      <p className="text-sm text-gray-600 mb-1">{house.location}</p>

      {/* Price */}
      <p className="text-purple-600 font-semibold">
        FCFA {house.price.toLocaleString()} <span>/Mouth</span>
      </p>

      {/* Poster Info */}
      <div className="flex items-center gap-2 mt-3">
        <img
          src={house.postedBy?.profilePic}
          alt={house.postedBy?.name}
          className="w-6 h-6 rounded-full object-cover"
        />
        <div className="text-xs text-gray-500">
          <p className="font-medium">{house.postedBy?.name}</p>
          <p>{house.postedBy?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
