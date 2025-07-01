import React, { useState } from "react";
import { UploadCloud } from "lucide-react";

const HouseImagesAndAmenities = ({
  photos,
  fileInputRef,
  handleFileUpload,
  removePhoto,
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageToDelete, setImageToDelete] = useState(null);

  // Simulate file upload
  const handleSimulatedUpload = (files) => {
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          handleFileUpload(files);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const confirmDelete = (index) => {
    setImageToDelete(index);
  };

  const handleDeleteConfirmed = () => {
    removePhoto(imageToDelete);
    setImageToDelete(null);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-md p-6 text-black">
      <div className="flex-1 flex flex-col overflow-auto">
        <label className="block text-base font-semibold mb-3 text-black">
          House Images
        </label>

        {/* Upload Box */}
        <div
          className="flex-1 border-4 border-dotted border-purple-600 rounded-xl flex flex-col items-center justify-center text-center text-gray-400 cursor-pointer hover:border-purple-700 transition duration-300 py-10"
          onClick={() => !uploading && fileInputRef.current?.click()}
          onDrop={(e) => {
            e.preventDefault();
            if (!uploading) handleSimulatedUpload(Array.from(e.dataTransfer.files));
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <UploadCloud className="w-12 h-12 text-purple-600 mb-2" />
          <span className="font-medium text-purple-700 text-lg">
            {uploading ? "Uploading..." : "Click or drag images to upload"}
          </span>
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept="image/png, image/jpeg"
            className="hidden"
            disabled={uploading}
            onChange={(e) => {
              if (!uploading) handleSimulatedUpload(Array.from(e.target.files));
            }}
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="w-full mt-4">
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                className="h-full bg-purple-600 rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-purple-700 mt-1">{progress}%</p>
          </div>
        )}

        {/* Uploaded Images */}
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-5">
            {photos.map((url, i) => (
              <div
                key={i}
                className="relative w-24 h-24 border-4 border-purple-700 rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={url}
                  className="w-full h-full object-cover"
                  alt={`house-${i}`}
                />
                <button
                  className="absolute top-0 right-0 bg-white text-purple-600 rounded-full border border-purple-500 w-6 h-6 text-xs font-bold flex items-center justify-center hover:bg-purple-100 transition"
                  onClick={() => confirmDelete(i)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {imageToDelete !== null && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
              <p className="text-lg text-black font-semibold mb-4">Remove this image?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setImageToDelete(null)}
                  className="px-4 py-2 rounded bg-gray-300 text-black"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="px-4 py-2 rounded bg-purple-700 text-white"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HouseImagesAndAmenities;
