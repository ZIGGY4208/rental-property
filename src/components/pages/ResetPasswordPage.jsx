import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { resetPasswordApi } from "../api/auth";

const ResetPasswordPage = () => {
  const { token } = useParams(); // token from the URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    try {
      console.log("Resetting password with token:", token);
      const res = await resetPasswordApi(token, { password });
      console.log("Reset password response:", res.data);

      toast.success(res.data.message || "Password reset successful!");
      navigate("/login"); // redirect to login page
    } catch (error) {
      console.error("Reset password error:", error);
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
