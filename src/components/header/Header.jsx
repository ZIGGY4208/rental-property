import React, { useState, useEffect, useRef } from "react";
import Logo from "../Logo";
import Navbar from "./Navbar";
import RegisterBTN from "./RegisterBTN";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu"; // ✅ NEW MENU COMPONENT

const Header = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(res.data.user || res.data);
        console.log("✅ Current user:", res.data.user || res.data);
      } catch (err) {
        console.error("❌ Failed to fetch current user:", err);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, []);

  // ✅ Close menu when clicking outside
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
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <div className="h-20 w-full bg-gray-100 px-4 flex items-center justify-between shadow-md">
      <div className="flex w-full h-full justify-between items-center overflow-hidden">
        <Logo />
        <Navbar currentUser={currentUser} />

        {/* ✅ RIGHT USER SECTION */}
        <div
          className="hidden md:flex items-center gap-3 relative"
          ref={menuRef}
        >
          {!currentUser ? (
            <RegisterBTN />
          ) : (
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-3 cursor-pointer px-3 py-1.5 rounded-full hover:bg-gray-200 transition-all duration-200 border border-transparent hover:border-gray-300 shadow-sm"
            >
              {/* ✅ AVATAR LOGIC (GENDER BASED) */}
              {currentUser.profile?.profileImage ? (
                <img
                  src={currentUser.profile.profileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-600 shadow"
                />
              ) : (
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow border-2
                    ${
                      currentUser.profile?.gender === "female"
                        ? "bg-gradient-to-br from-pink-400 to-rose-600 border-pink-400"
                        : "bg-gradient-to-br from-blue-400 to-indigo-600 border-blue-400"
                    }
                  `}
                >
                  {/* ✅ Gender Avatar Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 20.25a7.5 7.5 0 0115 0"
                    />
                  </svg>
                </div>
              )}

              {/* ✅ FULL NAME DISPLAY */}
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold text-gray-800">
                  {currentUser.profile?.firstName &&
                  currentUser.profile?.lastName
                    ? `${currentUser.profile.firstName} ${currentUser.profile.lastName}`
                    : currentUser.fullName || "User"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ✅ NEW FULL USER MENU */}
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
