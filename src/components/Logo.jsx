import React from "react";
import { Home } from "lucide-react";

const Logo = () => (
  <div className="text-[#2D3748] font-black leading-tight ">
    {/* Icon + Brand Name on same line */}
    <div className="flex items-center space-x-1">
      <Home size={24} strokeWidth={2.2} className="text-[#6d4de0]" />
      <span className="text-xl font-extrabold text-purple-400">
        HabiLink
      </span>
    </div>

    {/* Short tagline directly below */}
    <span className="block text-xs font-medium text-gray-500 mt-0">
      Home. Fast. Simple. Trusted.
    </span>
  </div>
);

export default Logo;
