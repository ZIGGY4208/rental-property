import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import {
  getUserByEmail,
  saveUser,
  setCurrentUser,
  getAllAdmins,
} from "../data/localStorageUtils";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(""); // new state for superadmin full name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [superAdminExists, setSuperAdminExists] = useState(false);

  // ✅ Check if superadmin exists on mount
  useEffect(() => {
    const admins = getAllAdmins();
    const superAdmin = admins.find((u) => u.role === "superadmin");
    setSuperAdminExists(!!superAdmin);
    console.log("💡 Superadmin exists:", !!superAdmin);
  }, []);

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const user = getUserByEmail(email);
      console.log("🔍 Attempting login for:", email, user);

      if (!user) {
        toast.error("❌ No such user found.");
        console.warn("❌ Login failed - user not found:", email);
      } else if (user.password !== password) {
        toast.error("❌ Wrong password.");
        console.warn("❌ Login failed - wrong password for:", email);
      } else if (user.role === "superadmin" || user.role === "admin") {
        // Login successful
        setCurrentUser(email);
        console.log("✅ Logged in user:", user);
        toast.success(`Welcome back, ${user.fullName}!`);
        navigate("/Admin/dashboard");
      } else {
        toast.error("❌ You are not authorized as admin.");
        console.warn("❌ Login failed - not an admin:", email);
      }

      setLoading(false);
    }, 800);
  };

  // Superadmin creation handler
  const handleSuperAdminSignup = (e) => {
    e.preventDefault();
    if (superAdminExists) {
      toast.error("⚠️ Superadmin already exists. Login instead.");
      console.warn("⚠️ Attempted to create another superadmin");
      return;
    }

    if (!fullName || !email || !password) {
      toast.error("❌ Please enter full name, email, and password for superadmin.");
      return;
    }

    const newSuperAdmin = {
      fullName,
      email,
      password,
      role: "superadmin",
      profile: null,
      fullyRegistered: true,
      createdBy: null,
      passwordResetCount: 0,
    };

    saveUser(newSuperAdmin);
    setSuperAdminExists(true);
    console.log("✅ Superadmin created dynamically:", newSuperAdmin);
    toast.success("Superadmin created! You can now login.");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-purple-200 rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
          {superAdminExists ? "Admin Login" : "Superadmin Setup"}
        </h2>

        {/* Conditional form */}
        {!superAdminExists ? (
          <form onSubmit={handleSuperAdminSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="superadmin@example.com"
                className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-200"
            >
              Create Superadmin
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full p-3 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-md transition duration-200"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
