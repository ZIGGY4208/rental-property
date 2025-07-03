import React, { useRef, useState } from "react";
import HouseUploadHeader from "../houseUploadComponents/HouseUploadHeader";
import HouseDetailsForm from "../houseUploadComponents/HouseDetailsForm";
import HouseImagesAndAmenities from "../houseUploadComponents/HouseImagesAndAmenities";
import { saveHouseToStorage } from "../data/localStorageUtils";

const HouseUploadPage = () => {
  const [title, setTitle] = useState("");
  const [houseType, setHouseType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    const urls = files.map(file => URL.createObjectURL(file));
    setPhotos((prev) => [...prev, ...urls]);
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const isFormValid = () => {
    return (
      title.trim() &&
      houseType.trim() &&
      location.trim() &&
      description.trim() &&
      rent.trim() &&
      !isNaN(rent) &&
      photos.length > 0
    );
  };

  const handleUploadHouse = () => {
    if (!isFormValid()) {
      showToast("Please complete all fields correctly.", "error");
      return;
    }

    const houseData = {
      title,
      houseType,
      location,
      description,
      rent,
      photos,
    };

    saveHouseToStorage(houseData);
    showToast("🏡 House listing saved!");

    // Reset form
    setTitle("");
    setHouseType("");
    setLocation("");
    setDescription("");
    setRent("");
    setPhotos([]);
  };

  return (
    <div className="h-screen flex p-6 flex-col relative">
      {/* Toast */}
      {toast && (
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow text-white z-50 ${
          toast.type === "error" ? "bg-red-600" : "bg-green-600"
        }`}>
          {toast.message}
        </div>
      )}

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
