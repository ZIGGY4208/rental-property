import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboardComponents/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = ({ user = { name: "Dr. Norica", avatar: "/ai.jpg" } }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:block h-full overflow-y-auto sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-50 flex bg-black/50 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute left-0 top-0 h-[100dvh] w-64 bg-white shadow-lg transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ Added padding-top here for a little space at the top */}
          <div className="">
            <Sidebar isMobile={true} setMobileOpen={setSidebarOpen} />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile hamburger + profile */}
        <div className="md:hidden p-4 bg-white shadow flex items-center flex-shrink-0">
          {/* Left: Hamburger + title */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-4 font-semibold text-lg">Administration</h1>
          </div>

          {/* Right: profile image */}
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full border-2 border-emerald-600 object-cover ml-auto"
          />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
