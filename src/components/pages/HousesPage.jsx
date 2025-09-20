import React from "react";
import { Outlet } from "react-router-dom";
import houses from "../data/houses";
import HouseTable from "../houseUploadComponents/HouseTable";

const HousesPage = () => {
  return (
    <div className="p-6">
      {/* Default content for /Admin/houses */}
      <HouseTable houses={houses} />

      {/* Nested routes (like /Admin/houses/upload) will render here */}
      <Outlet />
    </div>
  );
};

export default HousesPage;
