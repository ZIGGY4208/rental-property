import React from "react";
import { useMediaQuery } from "react-responsive";
import MobileHouseUpload from "./MobileHouseUpload";
import HouseUploadPage from "../pages/HouseUploadPage";
// import HouseUploadPage from "./HouseUploadPage"; // desktop/tablet
// import MobileHouseUpload from "./MobileHouseUpload"; // mobile

const HouseUploadWrapper = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 }); // mobile breakpoint

  return isMobile ? <MobileHouseUpload /> : <HouseUploadPage />;
};

export default HouseUploadWrapper;
