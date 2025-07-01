import React from "react";

const StatCard = ({
  title,
  value,
  subtitle,
  Icon,
  iconBg = "bg-emerald-100",
  iconColor = "text-emerald-600",
}) => (
  <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-between items-start mb-1">
      {/* Value and Title stacked */}
      <div>
        <div className="text-2xl font-bold text-purple-300">{value}</div>
        <div className="text-base font-semibold text-gray-600 ">{title}</div>
      </div>
      {/* Icon aligned to the top right */}
      <div className={`rounded-full p-4 ${iconBg}`}>
        {Icon && <Icon className={`w-10 h-10 text-white ${iconColor}`} />}
      </div>
    </div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
  </div>
);

export default StatCard;
