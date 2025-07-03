import React from "react";
import { Home } from "lucide-react";

const Logo = () => (
  <div className="text-[#2D3748] font-black leading-tight">
    {/* Icon + Brand Name on same line, responsive spacing */}
    <div className="flex items-center space-x-1 md:space-x-2">
      <Home
        size={20}
        className="text-[#6d4de0] md:w-6 md:h-6 w-5 h-5"
        strokeWidth={2.2}
      />
      <span className="text-lg md:text-xl font-extrabold text-purple-400">
        HabaLink
      </span>
    </div>

    {/* Responsive tagline */}
    <span className="block text-[10px] md:text-xs font-medium text-gray-500 mt-0.5 md:mt-1">
      Home. Fast. Simple. Trusted.
    </span>
  </div>
);

export default Logo;
