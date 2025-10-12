import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HouseTable from "../houseUploadComponents/HouseTable";
import { getAllHouses } from "../data/localStorageUtils"; // Make sure this function exists

const HousesPage = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const storedHouses = getAllHouses(); // Fetch from localStorage
    setHouses(storedHouses || []);
  }, []);

  return (
    <div className="p-6">
      {/* House table showing all stored houses */}
      <HouseTable houses={houses} />

      {/* Nested routes (like /Admin/houses/upload) will render here */}
      <Outlet />
    </div>
  );
};

export default HousesPage;
