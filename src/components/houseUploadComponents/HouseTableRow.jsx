import React from "react";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-600",
  Active: "bg-green-100 text-green-600",
  Inactive: "bg-red-100 text-red-600",
  "On Sale": "bg-blue-100 text-blue-600",
  Bouncing: "bg-purple-100 text-purple-600",
};

const HouseTableRow = ({ product }) => (
  <tr className="border-b border-gray-100 text-gray-700 hover:bg-gray-50">
    <td className="py-4 px-4 flex items-center gap-3">
      <img src={product.img} alt={product.name} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
      <span className="font-medium">{product.name}</span>
    </td>
    <td className="py-4 px-4">{product.id}</td>
    <td className="py-4 px-4">{product.price}</td>
    <td className="py-4 px-4">{product.stock}</td>
    <td className="py-4 px-4">{product.type}</td>
    <td className="py-4 px-4">
      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusStyles[product.status] || ""}`}>
        {product.status}
      </span>
    </td>
    <td className="py-4 px-4">
      <button className="p-1 rounded hover:bg-gray-100 transition">
        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <circle cx="4" cy="10" r="2" />
          <circle cx="10" cy="10" r="2" />
          <circle cx="16" cy="10" r="2" />
        </svg>
      </button>
    </td>
  </tr>
);

export default HouseTableRow;
