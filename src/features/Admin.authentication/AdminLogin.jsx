import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import axios from "axios";
import { useAdminAuth } from "./AdminAuthProvider";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("🚀 Login button clicked");

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return toast.error("Enter both email and password.");
    }

    console.log("📤 Sending request with:", { email, password });

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      console.log("📥 Full response:", res);
      console.log("📥 Response data:", res.data);

      const { token, user } = res.data;

      console.log("🔑 Token received:", token);
      console.log("👤 User received:", user);

      // ✅ Role check
      if (user.role !== "admin") {
        console.log("⛔ User is not admin:", user.role);
        return toast.error("You are not authorized.");
      }

      console.log("✅ User is admin");

      // ✅ Store token
      if (rememberMe) {
        localStorage.setItem("adminToken", token);
        console.log("💾 Token stored in localStorage");
      } else {
        sessionStorage.setItem("adminToken", token);
        console.log("💾 Token stored in sessionStorage");
      }

      console.log(
        "🔍 Stored token (local):",
        localStorage.getItem("adminToken"),
      );
      console.log(
        "🔍 Stored token (session):",
        sessionStorage.getItem("adminToken"),
      );

      // ✅ Store in context
      try {
        console.log("🧠 Updating auth context...");
        login(token, user);
        console.log("✅ Context updated successfully");
      } catch (contextError) {
        console.error("❌ Context error:", contextError);
      }

      toast.success(`Welcome back, ${user.fullName}!`);

      console.log("🚦 Attempting navigation to /Admin/dashboard");

      navigate("/Admin/dashboard");

      console.log("✅ Navigation function called");
    } catch (err) {
      console.error("❌ Login error:", err);
      console.log("❌ Error response:", err.response);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      console.log("🔄 Loading finished");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          HabaLink Admin
        </h1>
        <p className="text-center text-gray-600 mb-6">Sign In</p>

        <form autoComplete="off" onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => {
                console.log("✍️ Email input:", e.target.value);
                setEmail(e.target.value);
              }}
              required
              className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                console.log("✍️ Password input:", e.target.value);
                setPassword(e.target.value);
              }}
              required
              className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => {
                console.log("👁 Toggle password visibility");
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => {
                console.log("☑️ Remember me toggled:", !rememberMe);
                setRememberMe(!rememberMe);
              }}
              className="h-4 w-4 text-purple-600"
            />
            <span>Remember Me</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-700 hover:bg-purple-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex justify-start mt-2 text-sm">
            <button
              type="button"
              className="text-purple-700 hover:underline"
              onClick={() => {
                console.log("➡️ Navigating to forgot password");
                navigate("/Admin/forgot-password");
              }}
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
