import React from "react";
import Logo from "../Logo";
import Navbar from "./Navbar";
import RegisterBTN from "./RegisterBTN";
import { getCurrentUser } from "../data/localStorageUtils";

const Header = () => {
  const currentUser = getCurrentUser();

  console.log("Header → Current User:", currentUser);

  return (
    <div className="h-20 w-full bg-gray-100 px-4 flex items-center justify-between">
      <div className="flex w-full h-full justify-between items-center overflow-hidden">
        <Logo />
        <Navbar currentUser={currentUser} />


        {/* Right section */}
        <div className="hidden md:flex items-center gap-3">
          {!currentUser ? (
            <RegisterBTN />
          ) : (
            <div className="flex items-center gap-2">
              {console.log("Header → Profile Image:", currentUser.profile?.profileImage)}
              {console.log("Header → First Name:", currentUser.profile?.firstName)}

              {currentUser.profile?.profileImage ? (
                <img
                  src={currentUser.profile.profileImage}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                  {currentUser.profile?.firstName
                    ? currentUser.profile.firstName.charAt(0).toUpperCase()
                    : "U"}
                </div>
              )}
              <span className="text-gray-700 font-medium">
                {currentUser.profile?.firstName || "User"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
