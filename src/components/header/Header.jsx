import React from "react";
import Logo from "../Logo";
import Navbar from "./Navbar";
import RegisterBTN from "./RegisterBTN";
// import ProfileDisplay from "../ProfileDisplay";
import { getCurrentUser } from "../data/localStorageUtils";
import ProfileDisplay from "../Profiledisplay";
// import { getCurrentUser } from "../../utils/localStorageUtils"; // adjust path if needed

const Header = () => {
  const user = getCurrentUser();

  return (
    <div className="h-20 w-full bg-gray-100 px-4 items-center flex justify-between">
      <div className="flex w-full h-full justify-between items-center">
        <Logo />
        <Navbar />
        <div>
          {user && user.profile ? <ProfileDisplay/> : <RegisterBTN />}
        </div>
      </div>
    </div>
  );
};

export default Header;
