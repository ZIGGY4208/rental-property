import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, XCircle } from "lucide-react";
import RegisterBTN from "./RegisterBTN"; // mobile button

const navItems = [
  { name: "Home", path: "/" },
  { name: "Houses", path: "/houses" },
  { name: "Location", path: "/location" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("Navbar → currentUser prop:", currentUser);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="flex items-center justify-between relative z-50">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-14 text-base font-semibold">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `transition-all duration-200 ease-in-out ${
                  isActive
                    ? "text-purple-700 text-lg underline underline-offset-4"
                    : "text-gray-800"
                } hover:text-purple-700 hover:text-lg hover:underline`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Hamburger Icon (mobile only) */}
      {!isOpen && (
        <button
          className="md:hidden z-[9999]"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-[9998] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <div className="flex justify-end mb-6">
            <button onClick={toggleMenu} aria-label="Close Menu">
              <XCircle
                size={24}
                className="text-gray-700 hover:text-purple-700"
              />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col space-y-6 text-base font-semibold flex-grow">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `transition-all duration-200 ease-in-out ${
                      isActive
                        ? "text-purple-700 text-lg underline underline-offset-4"
                        : "text-gray-800"
                    } hover:text-purple-700 hover:text-lg hover:underline`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* Mobile-only Register/Login button */}
            {!currentUser && (
              <li className="mt-4">
                <RegisterBTN />
              </li>
            )}
          </ul>

          {/* ✅ User Profile Pill at bottom */}
          {currentUser && (
            <button
              onClick={() => console.log("Profile clicked!")}
              className="flex items-center gap-3 mt-auto px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors duration-200 w-full"
            >
              {currentUser.profile?.profileImage ? (
                <img
                  src={currentUser.profile.profileImage}
                  alt={currentUser.profile?.firstName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                  {currentUser.profile?.firstName
                    ? currentUser.profile.firstName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <span className="text-gray-800 font-medium">
                {currentUser.profile?.firstName || "User"}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[9997] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
