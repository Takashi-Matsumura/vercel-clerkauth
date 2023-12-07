import React, { useState } from "react";

export default function DateNav() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const weekdayOptions: Intl.DateTimeFormatOptions = {
      weekday: "narrow",
    };
    const dateString = new Intl.DateTimeFormat("ja-JP", options).format(date);
    const weekdayString = new Intl.DateTimeFormat(
      "ja-JP",
      weekdayOptions
    ).format(date);
    return `${dateString} (${weekdayString})`;
  };

  const handlePrevDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  return (
    <div className="flex items-center space-x-5">
      <button
        className="bg-black text-white rounded-full w-10 h-10 hover:bg-gray-500"
        onClick={handlePrevDay}
      >
        ◀
      </button>
      <span className="text-2xl">{formatDate(currentDate)}</span>
      <button
        className="bg-black text-white rounded-full w-10 h-10 hover:bg-gray-500"
        onClick={handleNextDay}
      >
        ▶
      </button>
    </div>
  );
  setCurrentDate(
    (prevDate) => new Date(prevDate.setDate(prevDate.getDate() + 1))
  );
}
