import React, { useState } from 'react';

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("desc");

  const product = {
    title: "Ipsum Imperdie Omitam Inciderint",
    price: 100,
    images: [
      "/img/shoe-main.jpg",
      "/img/shoe-1.jpg",
      "/img/shoe-2.jpg",
      "/img/shoe-3.jpg",
      "/img/shoe-4.jpg"
    ],
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit...`,
    longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ajam fringilla...`,
    rating: 4.5,
    reviewsCount: 1,
    categories: ["Clothing", "Laptops & Desktops"],
    tags: ["shoes"],
  };

  const relatedProducts = [
    {
      image: "/img/related-1.jpg",
      title: "Clothing, Laptops & Desktops",
      name: "Fusce Dui Dapibus Enim Proin",
      price: 48,
      oldPrice: 54,
      isSale: true,
    },
    {
      image: "/img/related-2.jpg",
      title: "Accessories, Handbag",
      name: "Lacus Quisque Posuere",
      price: 90,
      isSale: false,
    },
    {
      image: "/img/related-3.jpg",
      title: "Clothing, Kitting & T-shirt",
      name: "Faucibus Tempus Vela",
      price: 255,
      isSale: false,
    },
    {
      image: "/img/related-4.jpg",
      title: "Clothing, Kitting & T-shirt",
      name: "Imperdiet Eget Augue Auctor",
      price: 190,
      isSale: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Product Display Section */}
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <img src={product.images[selectedImage]} alt="Product" className="w-full h-72 object-contain rounded-lg border" />
          <div className="flex space-x-2 mt-2">
            {product.images.map((img, idx) => (
              <img
                key={img}
                src={img}
                alt=""
                onClick={() => setSelectedImage(idx)}
                className={`h-16 w-16 object-cover border rounded cursor-pointer ${selectedImage === idx ? 'border-black' : 'border-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-xl font-semibold">{product.title}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-yellow-400">&#9733; {product.rating}</span>
            <span className="text-gray-400">({product.reviewsCount} customer review{product.reviewsCount !== 1 && 's'})</span>
          </div>
          <div className="text-red-600 text-2xl font-bold mt-2">${product.price.toFixed(2)}</div>
          <p className="text-gray-600 my-3">{product.description}</p>
          <div className="flex items-center space-x-2 my-4">
            <input type="number" min="1" defaultValue="1" className="w-16 border rounded p-2" />
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">Add to cart</button>
          </div>
          <div className="flex space-x-4 my-2 text-gray-700 text-sm">
            <button className="hover:underline">Browse Wishlist</button>
            <button className="hover:underline">Add to compare</button>
          </div>
          <div className="my-2 text-xs">
            <div>Categories: {product.categories.join(', ')}</div>
            <div>Tags: {product.tags.join(', ')}</div>
          </div>
          <div className="flex items-center space-x-2 mt-2 text-gray-500">
            <span>Share this product:</span>
            <button className="hover:text-black"><i className="fab fa-facebook-f" /></button>
            <button className="hover:text-black"><i className="fab fa-twitter" /></button>
            <button className="hover:text-black"><i className="fab fa-linkedin-in" /></button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-b mt-8">
        <div className="flex space-x-8">
          <button
            className={`py-2 px-4 border-b-2 transition ${activeTab === "desc" ? "border-red-500 text-red-500" : "border-transparent text-gray-600"}`}
            onClick={() => setActiveTab("desc")}
          >
            Description
          </button>
          <button
            className={`py-2 px-4 border-b-2 transition ${activeTab === "reviews" ? "border-red-500 text-red-500" : "border-transparent text-gray-600"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({product.reviewsCount})
          </button>
        </div>
        <div className="py-4 text-gray-600 text-sm">
          {activeTab === "desc" ? product.longDescription : <div>No reviews yet.</div>}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <h3 className="text-center text-xl font-semibold mb-2">Related products</h3>
        <div className="flex justify-center mb-6">
          <span className="h-1 bg-red-500 w-12 rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg border shadow hover:shadow-lg transition">
              <div className="relative">
                <img src={p.image} alt={p.name} className="w-full h-36 object-contain mb-2" />
                {p.isSale && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">Sale!</span>
                )}
              </div>
              <div className="text-xs text-gray-500">{p.title}</div>
              <div className="font-semibold">{p.name}</div>
              <div className="mt-2">
                <span className="text-red-600 font-bold">${p.price.toFixed(2)}</span>
                {p.oldPrice && (
                  <span className="ml-2 line-through text-gray-400">${p.oldPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
