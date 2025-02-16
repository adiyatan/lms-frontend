import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBook,
  faUsers,
  faComments,
  faChalkboardTeacher,
  faCog,
  faCalendar,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const SidebarLeft: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Untuk mendapatkan path saat ini

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menuItems = [
    { icon: faTachometerAlt, label: "Dashboard", path: "/dashboard" },
    { icon: faBook, label: "Modul", path: "/modules" },
    { icon: faUsers, label: "Peserta", path: "/peserta" },
    { icon: faComments, label: "Group Chat", path: "/group-chat" },
    { icon: faChalkboardTeacher, label: "Pemateri", path: "/pemateri" },
  ];

  const profileItems = [
    { icon: faCog, label: "Settings", path: "/settings" },
    { icon: faCalendar, label: "Kalender", path: "/kalender" },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-64 bg-white text-black p-6">
        <h1 className="text-xl font-bold">Adhivasindo</h1>
      </div>
      <aside className="w-64 bg-[#2C2A50] text-white p-6 flex flex-col">
        <nav className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                location.pathname === item.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`text-lg ${
                  location.pathname === item.path ? "text-yellow-500" : ""
                }`}
              />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
        <hr className="my-6 border-gray-600" />
        <div className="space-y-4">
          <p className="text-sm text-gray-400">PROFILE</p>
          {profileItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                location.pathname === item.path
                  ? "bg-white text-black"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
        <hr className="my-6 border-gray-600" />
        <button
          className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-600"
          onClick={handleLogout}
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
          <span className="text-sm">Log Out</span>
        </button>
      </aside>
    </div>
  );
};

export default SidebarLeft;
