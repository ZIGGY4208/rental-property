import React from "react";

const Pagination = () => (
  <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
    <button className="disabled:opacity-50 hover:underline" disabled>
      &lt; Previous
    </button>
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 10, 11].map((page) => (
        <button
          key={page}
          className={`w-8 h-8 rounded-lg ${page === 3 ? "bg-blue-600 text-white" : "hover:bg-gray-200"}`}
        >
          {page < 10 ? `0${page}` : page}
        </button>
      ))}
    </div>
    <button className="hover:underline">Next &gt;</button>
  </div>
);

export default Pagination;
