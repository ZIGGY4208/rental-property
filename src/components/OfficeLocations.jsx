import React from "react";

const OfficeLocations = () => (
  <section className="bg-white py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-black mb-10">
        Our <span className="text-purple-600">Offices</span>
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Buea Office</h3>
          <p className="text-sm mb-1">Bonduma, Street 12</p>
          <p className="text-sm mb-1">+237 678 123 456</p>
          <p className="text-sm">hello@habilink.com</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">Douala Office</h3>
          <p className="text-sm mb-1">Akwa, Road 33</p>
          <p className="text-sm mb-1">+237 698 987 654</p>
          <p className="text-sm">douala@habilink.com</p>
        </div>
      </div>
    </div>
  </section>
);

export default OfficeLocations;
