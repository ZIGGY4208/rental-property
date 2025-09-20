import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, Eye } from "lucide-react";

const HouseImagesAndAmenities = ({ photos, handleFileUpload, removePhoto }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // ===== Handle file selection =====
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      type: file.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(file),
    }));
    handleFileUpload(newFiles);
  };

  // ===== Handle drop zone =====
  const handleDropZone = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const newFiles = files.map((file) => ({
      id: `${Date.now()}-${file.name}`,
      type: file.type.startsWith("video") ? "video" : "image",
      url: URL.createObjectURL(file),
    }));
    handleFileUpload(newFiles);
  };

  // ===== Handle sorting =====
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = photos.findIndex((p) => p.id === active.id);
      const newIndex = photos.findIndex((p) => p.id === over.id);
      const newPhotos = arrayMove(photos, oldIndex, newIndex);
      handleFileUpload(newPhotos, true);
    }
  };

  // ===== Sortable item =====
  const SortableItem = ({ item, idx }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
      useSortable({ id: item.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative group"
      >
        {item.type === "image" ? (
          <img
            src={item.url}
            alt={`House ${idx}`}
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => setPreviewIndex(idx)}
            title="Click to enlarge"
          />
        ) : (
          <video
            src={item.url}
            controls
            className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg cursor-pointer"
            onClick={() => setPreviewIndex(idx)}
          />
        )}

        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
          {/* Delete button - stop drag */}
          <div onPointerDown={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="bg-red-600 text-white rounded-full p-2 sm:p-1.5"
              onClick={() => removePhoto(idx)}
            >
              <X className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Preview button - stop drag */}
          <div onPointerDown={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="bg-gray-700 text-white rounded-full p-2 sm:p-1.5"
              onClick={() => setPreviewIndex(idx)}
              title="Preview"
            >
              <Eye className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Drop zone */}
      <div
        className={`w-full p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDropZone}
        onClick={() => document.getElementById("fileInput")?.click()}
        style={{ minHeight: photos.length > 0 ? "80px" : "150px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v4h16v-4M12 12V4m0 0L8 8m4-4l4 4"
          />
        </svg>
        <p className="text-gray-600 text-sm sm:text-base">
          Drag & drop images/videos here, or click to upload
        </p>
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Sortable thumbnails */}
      {photos.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={photos.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mt-4">
              {photos.map((item, idx) => (
                <SortableItem key={item.id} item={item} idx={idx} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Preview modal (images + videos) */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewIndex(null)}
        >
          <div className="max-h-[85vh] max-w-[95vw]">
            {photos[previewIndex]?.type === "image" ? (
              <img
                src={photos[previewIndex].url}
                alt="Preview"
                className="max-h-[85vh] max-w-[95vw] rounded-lg mx-auto"
              />
            ) : (
              <video
                src={photos[previewIndex].url}
                controls
                autoPlay
                className="max-h-[85vh] max-w-[95vw] rounded-lg mx-auto"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseImagesAndAmenities;
