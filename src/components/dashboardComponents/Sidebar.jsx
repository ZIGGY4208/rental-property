import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { adminRoutes } from "../routes/adminRoutes";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const mainNavItems = adminRoutes.filter((item) => item.section === "main");
  const bottomNavItems = adminRoutes.filter((item) => item.section === "bottom");

  const renderNavItem = (item) => {
    const isActive = location.pathname === `/Admin/${item.path}`;
    const Icon = item.icon;

    return (
      <li key={item.label} className="mb-2">
        <Link
          to={`/Admin/${item.path}`}
          title={collapsed ? item.label : ""} // Tooltip when collapsed
          className={`group flex items-center w-full px-3 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-purple-700 text-white font-semibold scale-[1.02]"
              : "text-black hover:bg-purple-200"
          }`}
        >
          <span className="text-lg">
            <Icon
              className={`transition-colors duration-300 ${
                isActive ? "text-white" : "text-purple-700"
              }`}
            />
          </span>
          {!collapsed && (
            <span
              className={`ml-3 transition-opacity duration-300 ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              {item.label}
            </span>
          )}
        </Link>
      </li>
    );
  };

  return (
    <aside
      className={`bg-white text-black ${
        collapsed ? "w-20" : "w-64"
      } p-4 flex flex-col min-h-screen shadow-lg transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-purple-300 pb-2">
        <div className="flex items-center space-x-2">
          <Home className="text-purple-700" size={28} />
          {!collapsed && (
            <span className="text-2xl font-extrabold tracking-wide text-purple-700">
              HabiLink
            </span>
          )}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-purple-100 transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="text-purple-700" />
          ) : (
            <ChevronLeft className="text-purple-700" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-between">
        <ul>{mainNavItems.map(renderNavItem)}</ul>
        <ul className="pt-4 border-t border-purple-100">
          {bottomNavItems.map(renderNavItem)}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
