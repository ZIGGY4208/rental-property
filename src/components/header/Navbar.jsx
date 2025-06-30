import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; // For hamburger and close icons

const navItems = [
  { name: "Home", path: "/" },
  { name: "Houses", path: "/houses" },
  { name: "Location", path: "/location" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu visibility

  return (
    <nav className="flex items-center justify-between px-6 py-4 relative overflow-x-hidden">
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center space-x-14 text-base font-semibold">
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `
                  transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? "text-purple-700 text-lg underline underline-offset-4"
                      : "text-gray-800"
                  }
                  hover:text-purple-700 hover:text-lg hover:underline`
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Hamburger Icon (Visible on Mobile) */}
      <button
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 right-0 w-full bg-white z-[9999] shadow-md flex flex-col items-center space-y-6 py-6 text-base font-semibold md:hidden">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)} // Close after click
                className={({ isActive }) =>
                  `
                    transition-all duration-200 ease-in-out
                    ${
                      isActive
                        ? "text-purple-700 text-lg underline underline-offset-4"
                        : "text-gray-800"
                    }
                    hover:text-purple-700 hover:text-lg hover:underline`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
