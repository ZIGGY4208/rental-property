import React, { useRef, useState } from "react";
import HouseUploadHeader from "../houseUploadComponents/HouseUploadHeader";
import HouseDetailsForm from "../houseUploadComponents/HouseDetailsForm";
import MobileImagesAndAmenities from "../houseUploadComponents/MobileImagesAndAmenities";

const MobileHouseUpload = () => {
  const [title, setTitle] = useState("");
  const [houseType, setHouseType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileUpload = (files, replace = false) => {
    const updatedPhotos = replace ? files : [...photos, ...files];
    setPhotos(updatedPhotos);
  };

  const removePhoto = (id) => {
    const toRemove = photos.find((p) => p.id === id);
    if (toRemove?.url?.startsWith("blob:")) URL.revokeObjectURL(toRemove.url);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
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
      photos.length > 0 &&
      photos.every((p) => p.file)
    );
  };

  const handleUploadHouse = async () => {
    if (!isFormValid()) {
      showToast("Please complete all fields correctly.", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("houseType", houseType);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("rent", rent);
      photos.forEach((p) => p.file && formData.append("photos", p.file));

      const token = localStorage.getItem("token");

      const res = await fetch("/api/houses", {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : undefined },
        body: formData,
      });

      const data = await res.json();
      showToast(`🏡 House listing saved! ID: ${data._id}`);

      photos.forEach(
        (p) => p.url?.startsWith("blob:") && URL.revokeObjectURL(p.url)
      );
      setTitle("");
      setHouseType("");
      setLocation("");
      setDescription("");
      setRent("");
      setPhotos([]);
    } catch (err) {
      console.error(err);
      showToast(err?.message || "Upload failed", "error");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-auto p-4 bg-gray-100 gap-4">
      {toast && (
        <div
          className={`px-6 py-3 rounded shadow text-white fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${
            toast.type === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <HouseUploadHeader onUpload={handleUploadHouse} />

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

      <MobileImagesAndAmenities
        photos={photos}
        handleFileUpload={handleFileUpload}
        removePhoto={removePhoto}
      />
    </div>
  );
};

export default MobileHouseUpload;
