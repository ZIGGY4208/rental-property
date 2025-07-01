import React from "react";
import { getCurrentUser } from "./data/localStorageUtils";

const ProfileDisplay = () => {
  const user = getCurrentUser();
  console.log("Current user profile data:", user); // Debug log

  const defaultAvatar = "/ai.jpg"; // relative to public folder

  return (
    <header className="hidden md:flex justify-between items-center px-6 py-4 text-gray-500 text-2xl">
      {user?.profile && (
        <div className="flex items-center gap-3">
          <img
            src={user.profile.photo || defaultAvatar}
            className="w-10 h-10 rounded-full object-cover"
            alt="Profile"
          />
          <span className=''>
            {user.profile.firstName} {user.profile.lastName}
          </span>
        </div>
      )}
    </header>
  );
};

export default ProfileDisplay;
