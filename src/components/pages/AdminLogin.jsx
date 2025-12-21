import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useAdminAuth } from "../data/useAdminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [superAdminExists, setSuperAdminExists] = useState(false);

  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        console.log("🔍 Checking superadmin existence...");
        const res = await axios.get(
          "http://localhost:5000/api/super-admin/superadmin-exists"
        );
        console.log("📥 Superadmin existence response:", res.data);
        setSuperAdminExists(res.data.exists);
      } catch (err) {
        console.error("❌ Error checking superadmin:", err);
        toast.error("Could not check admin status");
      } finally {
        setLoading(false);
      }
    };
    checkSuperAdmin();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Enter both email and password.");

    try {
      console.log("🔐 Sending login request:", { email, password });
      const res = await axios.post(
        "http://localhost:5000/api/super-admin/login",
        { email, password }
      );
      console.log("📥 Backend login response:", res.data);

      const { token, user } = res.data;

      if (!["admin", "superadmin"].includes(user.role)) {
        console.log("⛔ Unauthorized role:", user.role);
        return toast.error("You are not authorized to access this panel.");
      }

      localStorage.setItem("token", token);
      console.log("💾 Token saved:", token);

      await login(user.email, password);
      toast.success(`Welcome back, ${user.fullName}!`);
      navigate("/Admin/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg
            className="w-12 h-12 mx-auto animate-spin text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="text-gray-600 mt-2">Initializing system...</p>
        </div>
      </div>
    );

  if (!superAdminExists)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Superadmin not configured!
          </h1>
          <p className="text-gray-700">
            Please contact the system owner to set up the superadmin.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Admin Login
        </h2>

        <form autoComplete="off" onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 hover:bg-purple-800 text-white p-3 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
