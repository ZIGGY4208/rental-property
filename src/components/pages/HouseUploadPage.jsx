import React, { useRef, useState } from "react";
import HouseUploadHeader from "../houseUploadComponents/HouseUploadHeader";
import HouseDetailsForm from "../houseUploadComponents/HouseDetailsForm";
import HouseImagesAndAmenities from "../houseUploadComponents/HouseImagesAndAmenities";
import { saveHouseToStorage } from "../data/localStorageUtils";
// import { saveHouseToStorage } from "../utils/localStorageUtils"; // make sure this path is correct

const defaultImages = ["https://i.imgur.com/7Q9U6Gk.png"];

const HouseUploadPage = () => {
  const [title, setTitle] = useState("Modern Studio Apartment");
  const [houseType, setHouseType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(
    "A fully furnished studio with water and electricity bills included."
  );
  const [rent, setRent] = useState("85000");
  const [photos, setPhotos] = useState(defaultImages);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const urls = files.map(() => defaultImages[0]); // Placeholder
    setPhotos((prev) => [...prev, ...urls]);
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUploadHouse = () => {
    const houseData = {
      title,
      houseType,
      location,
      description,
      rent,
      photos,
    };
    saveHouseToStorage(houseData);
    alert("🏡 House listing saved to local storage!");
    console.log("Saved house:", houseData);
  };

  return (
    <div className="h-screen flex p-6 flex-col">
      <div className="shrink-0">
        <HouseUploadHeader onUpload={handleUploadHouse} />
      </div>
      <div className="flex-1 overflow-hidden p-6 bg-[#fafbfc]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <div className="h-full overflow-auto">
            <HouseDetailsForm
              {...{
                title,
                setTitle,
                houseType,
                setHouseType,
                location,
                setLocation,
                description,
                setDescription,
                rent,
                setRent,
              }}
            />
          </div>
          <div className="h-full overflow-auto">
            <HouseImagesAndAmenities
              {...{
                photos,
                handleDrop,
                fileInputRef,
                handleFileUpload,
                removePhoto,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseUploadPage;
