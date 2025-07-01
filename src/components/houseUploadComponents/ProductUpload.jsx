import React, { useRef, useState } from "react";

const defaultImages = [
  "https://i.imgur.com/7Q9U6Gk.png",
  "https://i.imgur.com/Hz6spE5.png",
  "https://i.imgur.com/F5f1OZp.png",
];

const categories = ["Jacket", "Shirt", "Pants", "Shoes"];
const currencies = ["Rupiah", "USD", "EUR"];

const ProductUpload = () => {
  const [name, setName] = useState("TRACK JACKET TEMPUR");
  const [category, setCategory] = useState("Jacket");
  const [description, setDescription] = useState(
    "Introducing the TRACK JACKET TEMPUR: a stylish, lightweight jacket with moisture-wicking fabric, breathable mesh lining, and reflective accents for enhanced visibility during night activities."
  );
  const [photos, setPhotos] = useState(defaultImages);
  const [pricing, setPricing] = useState("389.000");
  const [currency, setCurrency] = useState("Rupiah");
  const [maxDiscount, setMaxDiscount] = useState("12");
  const [discountType, setDiscountType] = useState("%");
  const [sizes, setSizes] = useState(["S", "S", "S"]);
  const [colors, setColors] = useState(["Black", "White"]);
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    // For demo, just use a sample image for each file
    const urls = files.map(() => "https://i.imgur.com/7Q9U6Gk.png");
    setPhotos((prev) => [...prev, ...urls]);
  };

  const removePhoto = (idx) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const addSize = () => {
    if (newSize.trim()) setSizes((s) => [...s, newSize.trim()]);
    setNewSize("");
  };

  const removeSize = (idx) => {
    setSizes((s) => s.filter((_, i) => i !== idx));
  };

  const addColor = () => {
    if (newColor.trim()) setColors((c) => [...c, newColor.trim()]);
    setNewColor("");
  };

  const removeColor = (idx) => {
    setColors((c) => c.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-[#fafbfc] min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">Uploud Product</h1>
          <p className="text-gray-500">Seamlessly upload, manage, and share your product effortlessly.</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="border border-gray-300 rounded-lg px-5 py-2 bg-white text-gray-700 font-semibold hover:bg-gray-100 transition">
            Archive Product
          </button>
          <button className="rounded-lg px-5 py-2 bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
            Upload Product
          </button>
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {/* Left Form */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          {/* Name Product */}
          <div>
            <label className="block text-sm font-semibold mb-1">Name Product</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              placeholder="Enter product name"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, i) => (
                <option value={cat} key={i}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          {/* Description */}
          <div>
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold mb-1">Description</label>
              <span className="text-xs text-gray-400">{description.length}/1000</span>
            </div>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-3 py-2 min-h-[70px] focus:outline-none focus:ring-2 focus:ring-orange-300"
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
              maxLength={1000}
              placeholder="Enter product description"
            />
          </div>
          {/* Pricing */}
          <div>
            <label className="block text-sm font-semibold mb-1">Pricing</label>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                value={pricing}
                onChange={(e) => setPricing(e.target.value)}
                placeholder="Price"
                type="number"
              />
              <select
                className="border border-gray-200 rounded-lg px-2 py-2"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {currencies.map((cur, i) => (
                  <option value={cur} key={i}>
                    {cur}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Max Discount */}
          <div>
            <label className="block text-sm font-semibold mb-1">Max Discount</label>
            <div className="flex gap-2">
              <input
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(e.target.value)}
                placeholder="Discount"
                type="number"
              />
              <select
                className="border border-gray-200 rounded-lg px-2 py-2"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option value="%">%</option>
                <option value="Rp">Rp</option>
              </select>
            </div>
          </div>
        </div>
        {/* Right Form */}
        <div className="flex flex-col gap-4">
          {/* Product Photos */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold mb-2">Product Photos</label>
            <div
              className="border-2 border-dashed border-orange-300 rounded-xl flex flex-col items-center justify-center h-36 text-center text-gray-400 cursor-pointer relative"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                <polyline points="16 12 12 8 8 12" />
                <line x1="12" y1="8" x2="12" y2="20" />
              </svg>
              <span className="block font-medium text-gray-600">Click to upload or drag and drop</span>
              <span className="text-xs text-gray-400">
                Max 10mb file size, Only png and jpeg files.
              </span>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => handleFileUpload(Array.from(e.target.files))}
              />
            </div>
            {/* Thumbnails */}
            <div className="flex flex-wrap gap-2 mt-4">
              {photos.map((url, i) => (
                <div key={i} className="relative w-16 h-16">
                  <img
                    src={url}
                    alt={`Product ${i + 1}`}
                    className="w-16 h-16 rounded object-cover border border-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-white rounded-full border border-gray-300 w-5 h-5 flex items-center justify-center text-gray-500 hover:bg-gray-100"
                    onClick={() => removePhoto(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Variant */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold mb-2">Variant</label>
            {/* Size */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-1 text-gray-500">Size</label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-100 border border-gray-200 px-2 py-1 rounded-lg text-sm gap-1"
                  >
                    {size}
                    <button type="button" className="text-gray-400 hover:text-red-400" onClick={() => removeSize(i)}>
                      ×
                    </button>
                  </div>
                ))}
                <input
                  className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-16"
                  value={newSize}
                  onChange={(e) => setNewSize(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addSize();
                  }}
                  placeholder="Add"
                />
                <button
                  type="button"
                  className="bg-orange-100 text-orange-600 rounded-lg px-2 py-1 text-sm font-bold"
                  onClick={addSize}
                >
                  +
                </button>
              </div>
            </div>
            {/* Color */}
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-500">Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color, i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-100 border border-gray-200 px-2 py-1 rounded-lg text-sm gap-1"
                  >
                    {color}
                    <button type="button" className="text-gray-400 hover:text-red-400" onClick={() => removeColor(i)}>
                      ×
                    </button>
                  </div>
                ))}
                <input
                  className="border border-gray-200 rounded-lg px-2 py-1 text-sm w-20"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") addColor();
                  }}
                  placeholder="Add"
                />
                <button
                  type="button"
                  className="bg-orange-100 text-orange-600 rounded-lg px-2 py-1 text-sm font-bold"
                  onClick={addColor}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpload;