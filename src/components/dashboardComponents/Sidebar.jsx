import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { adminRoutes } from "../routes/adminRoutes";

const Sidebar = ({ isMobile = false }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const mainNavItems = adminRoutes.filter((item) => item.section === "main");
  const bottomNavItems = adminRoutes.filter((item) => item.section === "bottom");

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const isActive = location.pathname.startsWith(`/Admin/${item.path}`);

    return (
      <li key={item.label} className="mb-2">
        <Link
          to={`/Admin/${item.path}`}
          title={collapsed ? item.label : ""}
          className={`group flex items-center w-full px-3 py-2 rounded-lg transition-all duration-300 ${
            isActive
              ? "bg-purple-700 text-white font-semibold scale-[1.02]"
              : "text-black hover:bg-purple-200"
          }`}
        >
          <span className="text-lg flex-shrink-0">
            <Icon
              className={`transition-colors duration-300 ${
                isActive ? "text-white" : "text-purple-700"
              }`}
            />
          </span>
          {!collapsed && (
            <span
              className={`ml-3 transition-opacity duration-300 whitespace-nowrap ${
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
        isMobile ? "w-64 h-[100dvh]" : collapsed ? "w-20 h-full" : "w-64 h-full"
      } p-4 flex flex-col shadow-lg transition-all duration-300 overflow-x-hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-purple-300 pb-2">
        <div className="flex items-center space-x-2">
          <Home className="text-purple-700" size={28} />
          {!collapsed && (
            <span className="text-2xl font-extrabold tracking-wide text-purple-700">
              HabaLink
            </span>
          )}
        </div>
        {!isMobile && (
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
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col justify-between overflow-y-auto">
        <ul className="mb-4">{mainNavItems.map(renderNavItem)}</ul>
        <ul>{bottomNavItems.map(renderNavItem)}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
