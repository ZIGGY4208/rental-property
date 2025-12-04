// src/components/pages/AdminLogout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../data/useAdminAuth";
import toast from "react-hot-toast";

const AdminLogout = () => {
  const { logout } = useAdminAuth(); // ✅ uses admin-specific logout
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);

  // Animate in
  useEffect(() => {
    setTimeout(() => setShowConfirm(true), 50);
  }, []);

  // Confirm logout
  const handleConfirm = () => {
    logout(); // ✅ only logs out admin
    toast.success("Admin logged out successfully");

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 300); // allow toast to show briefly before navigating
  };

  // Cancel logout
  const handleCancel = () => {
    navigate("/Admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div
        className={`text-center border bg-white border-gray-200 rounded-lg p-8 shadow-md max-w-md w-full transform transition-all duration-300 ${
          showConfirm ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <h2 className="text-2xl font-bold text-purple-600 mb-4">
          Are you sure you want to log out?
        </h2>
        <p className="text-gray-600 mb-6">
          You will be returned to the homepage.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
          >
            Yes, Log me out
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-6 py-2 rounded transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogout;
