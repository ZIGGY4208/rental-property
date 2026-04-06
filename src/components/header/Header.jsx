import React, { useState, useEffect, useRef } from "react";
import Logo from "../Logo";
import Navbar from "./Navbar";
import RegisterBTN from "./RegisterBTN";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import { Bell } from "lucide-react";
import { useAuth } from "../../features/authentication/hooks/useAuth";
// import { useAuth } from "../../features/authentication/hooks/useAuth";

const Header = () => {
  const { user: currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const navigate = useNavigate();

  /* CLOSE MENU WHEN CLICK OUTSIDE */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-20 w-full bg-gray-100 px-4 flex items-center justify-between shadow-md">
      <div className="flex w-full h-full justify-between items-center overflow-hidden">
        <Logo />

        <Navbar currentUser={currentUser} />

        <div
          className="hidden md:flex items-center gap-4 relative"
          ref={menuRef}
        >
          {!currentUser ? (
            <RegisterBTN />
          ) : (
            <div className="flex items-center gap-2">
              {/* NOTIFICATION ICON */}
              <div className="relative cursor-pointer hover:bg-gray-500 p-2 bg-gray-400 rounded-full transition">
                <Bell size={20} className="text-gray-700" />

                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </div>

              {/* USER PROFILE BLOCK */}
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer px-3 py-1.5 hover:bg-gray-200 transition-all duration-200"
              >
                {/* AVATAR */}
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/150"
                    alt="user avatar"
                    className="w-10 h-10 rounded-full object-cover border"
                  />

                  {/* ONLINE BADGE */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                {/* USER INFO */}
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-bold text-gray-900">
                    {currentUser.fullName || "User"}
                  </span>

                  <span className="text-xs text-gray-500 capitalize">
                    {currentUser.role || "member"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {menuOpen && currentUser && (
        <UserMenu
          user={currentUser}
          anchorRef={menuRef}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default Header;
