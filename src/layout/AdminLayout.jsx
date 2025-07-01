import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboardComponents/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with sticky behavior */}
      <div className="h-full overflow-y-auto sticky top-0">
        <Sidebar />
      </div>

      {/* Scrollable main content area */}
      <main className="flex-1 overflow-y-auto bg-gray-50 ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
