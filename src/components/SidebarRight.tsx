import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SidebarRight: React.FC = () => {
  const today = new Date().getDate();
  const startOfWeek = today - (today % 7);
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <aside className="w-80 bg-white p-6 shadow-md rounded-lg">
      <div className="mb-6 text-center">
        <img
          src="https://placehold.co/100"
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h3 className="text-lg font-semibold">Selamat Datang, Juliana</h3>
        <p className="text-gray-600">
          Di LMS by <span className="text-blue-600">LMS Pro</span>
        </p>
      </div>
      <div className="mb-6">
        <h4 className="text-md font-semibold mb-4 text-center text-gray-700">
          April 2025
        </h4>
        <div className="grid grid-cols-7 gap-2 bg-gray-800 p-4 rounded-lg">
          {daysOfWeek.map((day, i) => (
            <div
              key={i}
              className="text-center text-gray-300 font-medium text-sm"
            >
              {day}
            </div>
          ))}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`h-8 w-8 flex items-center justify-center rounded-lg font-medium border ${
                startOfWeek + i === today
                  ? "bg-gray-200 text-gray-900 border-gray-400"
                  : "text-white border-gray-600"
              }`}
            >
              {startOfWeek + i}
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-4">Jadwal Pemateri</h4>
        <ul className="space-y-4">
          <li className="flex items-center p-2 bg-blue-100 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-4"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">
                Storytelling dalam Pemasaran
              </p>
              <p className="text-xs text-gray-500">09:00 - 11:00 with mr.jam</p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
          </li>
          <li className="flex items-center p-2 bg-red-100 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-red-500 mr-4"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Pemrograman Frontend Modern</p>
              <p className="text-xs text-gray-500">
                12:00 - 14:00 with mr.firman
              </p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
          </li>
          <li className="flex items-center p-2 bg-yellow-100 rounded-lg">
            <div className="w-4 h-4 rounded-full bg-yellow-500 mr-4"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Pengembangan API</p>
              <p className="text-xs text-gray-500">
                14:30 - 15:30 with mr.panji
              </p>
            </div>
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400" />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarRight;
