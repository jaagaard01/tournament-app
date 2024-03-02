import {
  FaCalendarAlt,
  FaCog,
  FaHome,
  FaMapMarkerAlt,
  FaUserFriends,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const navItems = [
    {
      id: "dashboard",
      icon: <FaHome className="h-5 w-5" />,
      label: "Dashboard",
      path: "/",
    },
    {
      id: "venues",
      icon: <FaMapMarkerAlt className="h-5 w-5" />,
      label: "Venues",
      path: "venues",
    },
    {
      id: "events",
      icon: <FaCalendarAlt className="h-5 w-5" />,
      label: "Events",
      path: "events",
    },
    {
      id: "tournamentTypes",
      icon: <FaUserFriends className="h-5 w-5" />,
      label: "Tournament Types",
      path: "tournament-types",
    },
    {
      id: "settings",
      icon: <FaCog className="h-5 w-5" />,
      label: "Settings",
      path: "settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="sidebar bg-primary text-primary-content w-64 flex flex-col justify-between py-7">
        {/* Logo or App Name with space */}
        <div>
          <a
            href="#"
            className="text-white text-2xl font-semibold uppercase hover:text-gray-300 mb-10"
          >
            Puck Plan / HockeyHub
          </a>
          <div className="mt-5">
            {/* Navigation Tabs with dividers */}
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={`flex items-center p-2 space-x-4 border-b-2 border-neutral-700  ${
                  activeTab === item.id ? "bg-base-300" : ""
                } hover:bg-primary-focus w-full cursor-pointer`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10 text-2xl font-bold border-l-2 border-neutral-700 ">
        <Outlet />
      </div>
    </div>
  );
}
