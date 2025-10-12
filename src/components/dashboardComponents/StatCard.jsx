import React from "react";

const StatCard = ({
  title,
  value,
  subtitle,
  Icon,
  iconBg = "bg-emerald-100",
  iconColor = "text-emerald-600",
}) => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-36">
    <div className="flex justify-between items-start mb-2">
      {/* Value and Title */}
      <div>
        <div className="text-xl sm:text-2xl font-bold text-purple-400">{value}</div>
        <div className="text-sm sm:text-base font-semibold text-gray-600">{title}</div>
      </div>
      {/* Icon */}
      <div className={`rounded-full p-3 sm:p-4 ${iconBg}`}>
        {Icon && <Icon className={`w-6 h-6 sm:w-10 sm:h-10 ${iconColor}`} />}
      </div>
    </div>
    {subtitle && <div className="text-xs sm:text-sm text-gray-400 mt-1">{subtitle}</div>}
  </div>
);

export default StatCard;
