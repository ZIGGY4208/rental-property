import React from "react";

const HeaderActions = ({ showing, setShowing }) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Showing</span>
        <select
          className="rounded-lg border border-gray-200 px-3 py-1 bg-gray-100 text-gray-700 text-sm focus:outline-none"
          value={showing}
          onChange={(e) => setShowing(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
      <button className="flex items-center rounded-lg border border-gray-200 px-4 py-2 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium">
        Filter
      </button>
      <button className="flex items-center rounded-lg border border-gray-200 px-4 py-2 bg-white hover:bg-gray-50 text-gray-600 text-sm font-medium">
        Export
      </button>
      <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm shadow">
        Add New Product
      </button>
    </div>
  );
};

export default HeaderActions;
