import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [superAdminExists, setSuperAdminExists] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Check if superadmin exists
  useEffect(() => {
    const checkSuperAdmin = async () => {
      try {
        const res = await axios.get("/api/admin/superadmin-exists");
        setSuperAdminExists(res.data.exists);
      } catch (err) {
        console.error("❌ Error checking superadmin existence:", err);
        toast.error("Failed to check superadmin");
      } finally {
        setLoading(false);
      }
    };
    checkSuperAdmin();
  }, []);

  // ✅ Superadmin signup
  const handleSuperAdminSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password)
      return toast.error("Enter all fields!");
    try {
      const res = await axios.post("/api/auth/register", {
        fullName,
        email,
        password,
        role: "superadmin", // ensure backend sets role
      });
      toast.success("Superadmin created! You can now login.");
      setSuperAdminExists(true);
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("❌ Superadmin signup error:", err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  // ✅ Admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter all fields!");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, user } = res.data;

      // Check role
      if (!["superadmin", "admin"].includes(user.role)) {
        return toast.error("Not authorized as admin");
      }

      // Save JWT securely (localStorage for now)
      localStorage.setItem("token", token);

      toast.success(`Welcome back, ${user.fullName}`);
      navigate("/Admin/dashboard");
    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          {superAdminExists ? "Admin Login" : "Superadmin Setup"}
        </h2>

        {!superAdminExists ? (
          <form onSubmit={handleSuperAdminSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded"
            >
              Create Superadmin
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border rounded"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
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
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
