"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Add custom styles for the calendar
const calendarStyles = `
  .custom-calendar {
    background: transparent !important;
    border: none !important;
  }
  .custom-calendar .react-datepicker__header {
    background: transparent !important;
    border: none !important;
  }
  .custom-calendar .react-datepicker__month-container {
    background: transparent !important;
    border: none !important;
  }
  .custom-calendar .react-datepicker__day {
    color: white !important;
    border-radius: 4px !important;
  }
  .custom-calendar .react-datepicker__day-name {
    color: white !important;
  }
  .custom-calendar .react-datepicker__current-month {
    color: white !important;
  }
  .custom-calendar .react-datepicker__day--selected {
    background-color: transparent !important;
    border: 2px solid white !important;
    color: white !important;
  }
  .custom-calendar .react-datepicker__day--highlighted {
    background-color: #FFD700 !important;
    color: black !important;
    border: none !important;
  }
`;

export default function EvenementenPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Define event dates
  const eventDates = [
    new Date(2025, 4, 22), // 22 Mei 2025
    new Date(2025, 4, 26), // 26 Mei 2025
    new Date(2025, 4, 31), // 31 Mei 2025
    new Date(2025, 5, 4),  // 4 Juni 2025
    new Date(2025, 5, 7),  // 7 Juni 2025
  ];

  return (
    <div className="flex min-h-screen bg-[#F6F6F6] min-w-[1200px]">
      <main className="flex-1 p-12">
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-black text-3xl font-bold">Evenementen</h1>
          <div className="flex items-center gap-2 text-black">
            <span>Welkom, Marijn</span>
            <span className="w-8 h-8 rounded-full bg-gray-300 inline-block" />
          </div>
        </div>

        <h2 className="text-xl font-medium mb-4">Kalender</h2>

        <div className="flex gap-8">
          {/* Kalender */}
          <div className="bg-[#44743A] rounded-3xl flex-1 flex items-center justify-center min-h-[500px] p-6">
            <style>{calendarStyles}</style>
            <div className="w-full h-full flex items-center justify-center">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date!)}
                inline
                calendarClassName="custom-calendar"
                highlightDates={eventDates}
              />
            </div>
          </div>

          {/* Opkomende Evenementen */}
          <div className="flex flex-col gap-4 w-[340px]">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">
                Opkomende Evenementen
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  { name: "Duurzaam Denken", date: "22 Mei 2025" },
                  { name: "Groene Toekomst", date: "26 Mei 2025" },
                  { name: "Bewust Bouwen", date: "31 Mei 2025" },
                  { name: "Natuurlijk Leven", date: "4 Juni 2025" },
                  { name: "Schone Start", date: "7 Juni 2025" },
                ].map((ev, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <rect width="24" height="24" rx="6" fill="#44743A" />
                      <path
                        d="M8 12h8"
                        stroke="#fff"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{ev.name}</span>
                    <span className="ml-auto text-sm">{ev.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}