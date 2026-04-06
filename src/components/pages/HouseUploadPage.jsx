import React, { useRef, useState } from "react";
import axios from "axios";
import HouseUploadHeader from "../houseUploadComponents/HouseUploadHeader";
import HouseDetailsForm from "../houseUploadComponents/HouseDetailsForm";
// import HouseImagesAndAmenities from "../houseUploadComponents/HouseImagesAndAmenities";
import HouseImagesAndAmenities from "../houseUploadComponents/HouseImagesAndAmenities";


const HouseUploadPage = () => {
  const [title, setTitle] = useState("");
  const [houseType, setHouseType] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [photos, setPhotos] = useState([]);
  const [toast, setToast] = useState(null);

  const fileInputRef = useRef(null);

  /* ---------------------------------------------
        HANDLE UPLOAD + ADD MEDIA
  ---------------------------------------------- */
  const handleFileUpload = (files, replace = false) => {
    const updatedPhotos = replace ? files : [...photos, ...files];
    setPhotos(updatedPhotos);
  };

  /* ---------------------------------------------
        REMOVE MEDIA (BY ID — FIXED!)
  ---------------------------------------------- */
  const removePhoto = (id) => {
    const toRemove = photos.find((p) => p.id === id);

    if (toRemove?.url?.startsWith("blob:")) {
      URL.revokeObjectURL(toRemove.url);
    }

    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  /* ---------------------------------------------
          TOAST
  ---------------------------------------------- */
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ---------------------------------------------
          VALIDATION
  ---------------------------------------------- */
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

  /* ---------------------------------------------
          FINAL SUBMIT
  ---------------------------------------------- */
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

      photos.forEach((p) => {
        if (p.file) {
          formData.append("photos", p.file);
        }
      });

      const token = localStorage.getItem("token");

      const res = await axios.post("/api/houses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });

      showToast(`🏡 House listing saved! ID: ${res.data._id}`);

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
      showToast(err?.response?.data?.message || "Upload failed", "error");
    }
  };

  return (
    <div className="h-screen flex p-6 flex-col relative bg-gray-100">
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

      <div className="flex-1 overflow-hidden p-6 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full bg-gray-100">
          <div className="h-full overflow-auto">
            <HouseImagesAndAmenities
              photos={photos}
              handleFileUpload={handleFileUpload}
              removePhoto={removePhoto}
            />
          </div>

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
