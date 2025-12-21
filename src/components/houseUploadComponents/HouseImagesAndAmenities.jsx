// src/components/houseUploadComponents/HouseImagesAndAmenities.jsx
import React, { useCallback, useEffect, useRef, useState } from "react";
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

const uid = () =>
  (typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID()) ||
  `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const HouseImagesAndAmenities = ({
  photos = [],
  handleFileUpload,
  removePhoto,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewId, setPreviewId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalSrc, setModalSrc] = useState(null);
  const fileInputRef = useRef(null);
  const modalVideoRef = useRef(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const findById = useCallback(
    (id) => photos.find((p) => p.id === id),
    [photos]
  );

  // ---------------- File upload ----------------
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

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer?.files || []);
    if (!files.length) return;
    handleFiles(files);
  };

  // ---------------- Drag & reorder ----------------
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active || active.id === over.id) return;
    const oldIndex = photos.findIndex((p) => p.id === active.id);
    const newIndex = photos.findIndex((p) => p.id === over.id);
    const newOrder = arrayMove(photos, oldIndex, newIndex);
    handleFileUpload(newOrder, true);
  };

  // ---------------- Preview modal ----------------
  const openPreview = (item) => {
    setPreviewId(item.id);
    setModalSrc(item.url);
    setModalType(item.type);
    setShowModal(true);
  };

  const closePreview = () => {
    setPreviewId(null);
    setModalSrc(null);
    setModalType(null);
    setShowModal(false);
  };

  // ---------------- Delete ----------------
  const onDelete = (id) => {
    removePhoto(id);
    if (previewId === id) closePreview();
  };

  // ---------------- Keyboard support ----------------
  useEffect(() => {
    const handleKey = (e) => {
      if (!showModal) return;

      // Spacebar play/pause video
      if (
        e.code === "Space" &&
        modalType === "video" &&
        modalVideoRef.current
      ) {
        e.preventDefault();
        const video = modalVideoRef.current;
        if (video.paused) video.play();
        else video.pause();
      }

      // Escape closes modal
      if (e.code === "Escape") {
        e.preventDefault();
        closePreview();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showModal, modalType]);

  // ---------------- Sortable Thumbnail ----------------
  const SortableThumbnail = ({ item }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: item.id });

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
        className="relative group cursor-pointer"
      >
        {item.type === "image" ? (
          <img
            src={item.url}
            alt="thumbnail"
            className="w-full h-28 object-cover rounded-lg"
            onClick={() => openPreview(item)}
          />
        ) : (
          <video
            src={item.url}
            className="w-full h-28 object-cover rounded-lg bg-black"
            muted
            preload="metadata"
            playsInline
            onClick={() => openPreview(item)}
          />
        )}

        {/* Drag handle */}
        <div
          {...listeners}
          className="absolute left-1 top-1 bg-white/80 rounded p-1 text-xs cursor-grab"
          title="Drag to reorder"
          onClick={(e) => e.stopPropagation()}
        >
          ≡
        </div>

        {/* Action buttons */}
        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
            className="bg-red-600 text-white rounded-full p-1.5"
            aria-label="Delete"
          >
            <X className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openPreview(item);
            }}
            className="bg-gray-700 text-white rounded-full p-1.5"
            aria-label="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Dropzone */}
      <div
        className={`w-full p-6 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click?.()}
      >
        <p className="text-gray-600">
          Drag & drop images/videos here or click to upload
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={onFileInputChange}
        />
      </div>

      {/* Thumbnails */}
      {photos.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={photos.map((p) => p.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4">
              {photos.map((item) => (
                <SortableThumbnail key={item.id} item={item} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Preview Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-h-[85vh] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close X button */}
            <button
              onClick={closePreview}
              className="absolute top-2 right-2 bg-gray-700 text-white rounded-full p-2 z-50 hover:bg-gray-600"
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
                ref={modalVideoRef}
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

export default HouseImagesAndAmenities;
