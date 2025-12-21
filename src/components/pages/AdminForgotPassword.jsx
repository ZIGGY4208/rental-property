import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      console.log("🔑 Sending forgot password request:", { email });
      const res = await axios.post(
        "http://localhost:5000/api/super-admin/forgot-password",
        { email }
      );
      console.log("📥 Response:", res.data);
      toast.success(
        "Password reset email sent! Check console for URL in dev mode."
      );
    } catch (err) {
      console.error("❌ Forgot password error:", err.response?.data || err);
      toast.error(
        err.response?.data?.message || "Failed to send password reset email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800 text-white p-3 rounded"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
