import React, { useRef, useState } from "react";
import HouseUploadHeader from "../houseUploadComponents/HouseUploadHeader";
import HouseDetailsForm from "../houseUploadComponents/HouseDetailsForm";
import HouseImagesAndAmenities from "../houseUploadComponents/HouseImagesAndAmenities";
import { saveHouse } from "../data/localStorageUtils";

const HouseUploadPage = () => {
  const [title, setTitle] = useState("");
  const [houseType, setHouseType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  // Handle files uploaded via drag/drop or file input
  const handleFileUpload = (files, replace = false) => {
    const newFiles = files.map((file) => {
      if (file instanceof File) {
        return {
          id: `${Date.now()}-${file.name}`,
          type: file.type.startsWith("video") ? "video" : "image",
          url: URL.createObjectURL(file),
        };
      } else {
        return file;
      }
    });
    const updatedPhotos = replace ? newFiles : [...photos, ...newFiles];
    setPhotos(updatedPhotos);
  };

  // Remove a photo/video from the list
  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  // Show temporary toast messages
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Validate form before saving
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

  // Handle house upload using CRUD saveHouse
  const handleUploadHouse = () => {
    if (!isFormValid()) {
      showToast("Please complete all fields correctly.", "error");
      return;
    }

    const houseData = { title, houseType, location, description, rent, photos };
    const savedHouse = saveHouse(houseData); // Save house with unique ID
    showToast(`🏡 House listing saved! ID: ${savedHouse.id}`);

    // Reset form
    setTitle("");
    setHouseType("");
    setLocation("");
    setDescription("");
    setRent("");
    setPhotos([]);
  };

  return (
    <div className="h-screen flex p-6 flex-col relative bg-gray-100">
      {/* Toast */}
      {toast && (
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow text-white z-50 ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="shrink-0">
        <HouseUploadHeader onUpload={handleUploadHouse} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden p-6 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full bg-gray-100">
          {/* Left column: Images & Amenities */}
          <div className="h-full overflow-auto">
            <HouseImagesAndAmenities
              photos={photos}
              handleFileUpload={handleFileUpload}
              removePhoto={removePhoto}
            />
          </div>

          {/* Right column: House Details Form */}
          <div className="h-full overflow-auto">
            <HouseDetailsForm
              title={title}
              setTitle={setTitle}
              houseType={houseType}
              setHouseType={setHouseType}
              location={location}
              setLocation={setLocation}
              description={description}
              setDescription={setDescription}
              rent={rent}
              setRent={setRent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseUploadPage;
