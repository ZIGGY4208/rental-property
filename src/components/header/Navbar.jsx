import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, XCircle } from "lucide-react";
import RegisterBTN from "./RegisterBTN";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Houses", path: "/houses" },
  { name: "Location", path: "/location" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

      {/* Hamburger Icon */}
      {!isOpen && (
        <button
          className="md:hidden z-[9999]"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={28} />
        </button>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-white shadow-lg z-[9998] transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-6">
            <button onClick={toggleMenu} aria-label="Close Menu">
              <XCircle
                size={24}
                className="text-gray-700 hover:text-purple-700"
              />
            </button>
          </div>

          {/* Mobile Links */}
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

            {/* Mobile Register Button */}
            {!currentUser && (
              <li className="mt-4">
                <RegisterBTN />
              </li>
            )}
          </ul>

          {/* USER PROFILE (Mobile Bottom) */}
          {currentUser && (
            <button
              onClick={() => {
                navigate("/profile-setup");
                setIsOpen(false);
              }}
              className="flex items-center gap-3 mt-auto px-4 py-2 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors duration-200 w-full"
            >
              {/* Avatar */}
              <img
                src="https://i.pravatar.cc/150"
                alt="user avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />

              {/* Name */}
              <span className="text-gray-800 font-medium">
                {currentUser.fullName || "User"}
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
