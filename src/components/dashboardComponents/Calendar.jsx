import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const today = new Date();

  const daysArray = [
    ...Array(firstDayOfMonth).fill(""),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg w-full">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prevMonth} className="text-gray-500 hover:text-purple-600">
          <ChevronLeft size={20} />
        </button>
        <span className="font-semibold text-base sm:text-lg text-gray-700">
          {date.toLocaleString("default", { month: "long" })} {currentYear}
        </span>
        <button onClick={nextMonth} className="text-gray-500 hover:text-purple-600">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm text-gray-400 text-center mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs sm:text-sm text-center">
        {daysArray.map((day, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded-full transition h-8 w-8 sm:h-10 sm:w-10 mx-auto ${
              day === today.getDate() &&
              currentMonth === today.getMonth() &&
              currentYear === today.getFullYear()
                ? "bg-purple-600 text-white font-bold"
                : "hover:bg-purple-100 text-gray-700"
            }`}
          >
            {day !== "" ? day : <span className="invisible">0</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
