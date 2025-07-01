import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, XCircle } from "lucide-react"; // Hamburger and close icons

const navItems = [
  { name: "Home", path: "/" },
  { name: "Houses", path: "/houses" },
  { name: "Location", path: "/location" },
  { name: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    console.log("Hamburger menu toggled:", isOpen ? "CLOSE" : "OPEN");
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 relative z-50">
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

      {/* Hamburger Icon (Only visible when closed) */}
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
          {/* Close button inside menu */}
          <div className="flex justify-end mb-6">
            <button onClick={toggleMenu} aria-label="Close Menu">
              <XCircle size={24} className="text-gray-700 hover:text-purple-700" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <ul className="flex flex-col space-y-6 text-base font-semibold">
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
          </ul>

          {/* Footer text inside drawer */}
          <div className="mt-auto pt-10 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Part Home
          </div>
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
