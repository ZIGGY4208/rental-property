import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboardComponents/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <div className="hidden md:block h-full overflow-y-auto sticky top-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-black/50"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="absolute left-0 top-0 h-[100dvh] w-64 bg-white shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar isMobile={true} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile hamburger */}
        <div className="md:hidden p-4 bg-white shadow flex items-center flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-4 font-semibold text-lg">Administration</h1>
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
