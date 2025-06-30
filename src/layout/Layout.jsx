import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-black relative z-0">
      <Header /> {/* Top navigation bar */}
      <main className="flex-grow">
        <Outlet /> {/* Page-specific content renders here */}
      </main>
      <Footer /> {/* Footer visible on all layout pages */}
    </div>
  );
};

export default Layout;
