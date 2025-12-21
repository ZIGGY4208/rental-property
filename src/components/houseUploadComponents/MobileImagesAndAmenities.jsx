import React, { useRef, useState } from "react";
import { X } from "lucide-react";

const uid = () => `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const MobileImagesAndAmenities = ({
  photos = [],
  handleFileUpload,
  removePhoto,
}) => {
  const fileInputRef = useRef(null);
  const [modalSrc, setModalSrc] = useState(null);
  const [modalType, setModalType] = useState("image"); // track type in modal

  const handleFiles = (files) => {
    const newFiles = files.map((file) => ({
      id: uid(),
      file,
      type: file.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(file),
    }));
    handleFileUpload(newFiles, false);
  };

  const onFileInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    handleFiles(files);
    e.target.value = "";
  };

  const openModal = (p) => {
    setModalSrc(p.url);
    setModalType(p.type);
  };

  const closeModal = () => {
    setModalSrc(null);
    setModalType("image");
  };

  return (
    <div>
      {/* Upload area */}
      <div
        className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer bg-white"
        onClick={() => fileInputRef.current?.click?.()}
      >
        <p className="text-gray-600">Tap to upload images/videos</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={onFileInputChange}
        />
      </div>

      {/* Horizontal thumbnails */}
      {photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
          {photos.map((p) => (
            <div
              key={p.id}
              className="relative flex-shrink-0 w-28 h-28 rounded-lg overflow-hidden cursor-pointer"
            >
              {p.type === "image" ? (
                <img
                  src={p.url}
                  alt="thumb"
                  className="w-full h-full object-cover"
                  onClick={() => openModal(p)}
                />
              ) : (
                <video
                  src={p.url}
                  className="w-full h-full object-cover bg-black"
                  muted
                  playsInline
                  loop
                  onClick={() => openModal(p)}
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removePhoto(p.id);
                }}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {modalSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setModalSrc(null)} // clicking outside closes modal
        >
          <div
            className="relative max-h-[85vh] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()} // stops overlay click
          >
            {/* ✅ X button now closes modal properly */}
            <button
              onClick={() => setModalSrc(null)}
              className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600 z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {modalType === "image" ? (
              <img
                src={modalSrc}
                alt="Preview"
                className="max-h-[85vh] max-w-[95vw] mx-auto rounded-lg"
              />
            ) : (
              <video
                src={modalSrc}
                controls
                className="max-h-[85vh] max-w-[95vw] mx-auto rounded-lg bg-black"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileImagesAndAmenities;
