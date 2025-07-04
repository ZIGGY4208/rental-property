import React from "react";
// import HouseTable from "../components/HouseTable";
import houses from "../data/houses";
import HouseTable from "../houseUploadComponents/HouseTable";

const HousesPage = () => {
  return (
    <div className="p-6">
      <HouseTable houses={houses} />
    </div>
  );
};

export default HousesPage;
