import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterBTN = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth"); // navigate to AuthPage
  };

  return (
    <button
      onClick={handleClick}
      className="
        hidden
        lg:inline-block   
        bg-purple-500
        hover:bg-purple-400
        text-white text-sm font-semibold
        px-5 py-2
        rounded-full shadow-sm
        transition duration-200
      "
    >
      Register/Login
    </button>
  );
};

export default RegisterBTN;
