import React from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "lucide-react"; // Ensure lucide-react is installed

const BookNowBTN = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/houses"); // Navigate to the houses page
  };

  return (
    <button
      onClick={handleClick}
      className="
        hidden
        lg:inline-flex
        items-center gap-2
        bg-purple-500
        hover:bg-purple-400
        text-white text-sm font-semibold
        px-5 py-2
        rounded-full shadow-sm
        transition duration-200
      "
    >
      <Book size={16} />
      Book Now
    </button>
  );
};

export default BookNowBTN;
