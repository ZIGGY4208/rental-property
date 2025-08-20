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

  // Log initial states
  console.log("Initial State:", {
    title,
    houseType,
    location,
    description,
    rent,
    photos,
    toast,
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
    handleFileUpload(files);
  };

const handleFileUpload = (files, replace = false) => {
  console.log("handleFileUpload called with:", files);

  // Only create URLs for actual File objects
  const newFiles = files.map((file) => {
    if (file instanceof File) {
      return {
        id: `${Date.now()}-${file.name}`,
        type: file.type.startsWith("video") ? "video" : "image",
        url: URL.createObjectURL(file),
      };
    } else {
      // Already processed object
      return file;
    }
  });

  const updatedPhotos = replace ? newFiles : [...photos, ...newFiles];
  console.log("Updated photos state:", updatedPhotos);
  setPhotos(updatedPhotos);
};


  const removePhoto = (idx) => {
    console.log("Removing photo at index:", idx);
    setPhotos((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      console.log("Photos after removal:", updated);
      return updated;
    });
  };

  const showToast = (message, type = "success") => {
    console.log("Toast triggered:", { message, type });
    setToast({ message, type });
    setTimeout(() => {
      console.log("Toast cleared");
      setToast(null);
    }, 3000);
  };

  const isFormValid = () => {
    const valid =
      title.trim() &&
      houseType.trim() &&
      location.trim() &&
      description.trim() &&
      rent.trim() &&
      !isNaN(rent) &&
      photos.length > 0;
    console.log("Form validation result:", valid, {
      title,
      houseType,
      location,
      description,
      rent,
      photosLength: photos.length,
    });
    return valid;
  };

  const handleUploadHouse = () => {
    console.log("Upload button clicked");

    if (!isFormValid()) {
      showToast("Please complete all fields correctly.", "error");
      console.log("Upload aborted: form not valid");
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

    console.log("House data being saved:", houseData);
    saveHouseToStorage(houseData);
    showToast("🏡 House listing saved!");

    // Reset form
    console.log("Resetting form to empty");
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
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded shadow text-white z-50 ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
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
                setTitle: (val) => {
                  console.log("Title changed:", val);
                  setTitle(val);
                },
                houseType,
                setHouseType: (val) => {
                  console.log("House type changed:", val);
                  setHouseType(val);
                },
                location,
                setLocation: (val) => {
                  console.log("Location changed:", val);
                  setLocation(val);
                },
                description,
                setDescription: (val) => {
                  console.log("Description changed:", val);
                  setDescription(val);
                },
                rent,
                setRent: (val) => {
                  console.log("Rent changed:", val);
                  setRent(val);
                },
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
