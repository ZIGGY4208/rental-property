import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserByEmail,
  saveUser,
  setCurrentUser,
} from "../data/localStorageUtils";
import { AtSign, Lock, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Switch from "react-switch";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      const existing = getUserByEmail(email);
      if (existing) {
        toast.error("User already exists!");
        return;
      }
      saveUser({ email, password, role: "", profile: null });
      setCurrentUser(email);
      toast.success("Registration successful!");
      navigate("/profile-setup");
    } else {
      const existing = getUserByEmail(email);
      if (!existing || existing.password !== password) {
        toast.error("Invalid credentials");
        return;
      }
      setCurrentUser(email);
      toast.success("Login successful!");
      navigate("/");
    }
  };

  const bgClass = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800";
  const inputClass = darkMode ? "bg-gray-800 text-white placeholder-gray-400" : "bg-gray-100 text-gray-700 placeholder-gray-400";

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center px-4`}>
      <Toaster position="top-center" />

      <form
        onSubmit={handleSubmit}
        className="animate-fade-in-up bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700">
            {isRegistering ? "Create an Account" : "Welcome Back!"}
          </h2>
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            offColor="#ccc"
            onColor="#6b21a8"
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={40}
          />
        </div>

        {/* Email Input */}
        <div className="relative">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full ${inputClass} px-12 py-3 rounded-lg outline-none`}
          />
          <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
        </div>

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full ${inputClass} px-12 py-3 rounded-lg outline-none`}
          />
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          {isRegistering ? "Register" : "Login"}
        </button>

        {/* Toggle login/register */}
        <p className="text-sm text-center">
          {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-purple-600 font-medium underline"
          >
            {isRegistering ? "Log In" : "Register"}
          </button>
        </p>

        {/* Mock Social Logins */}
        <div className="mt-6">
          <div className="text-center text-sm mb-3 text-gray-400">Or login with</div>
          <div className="flex gap-4">
            <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <img src="https://img.icons8.com/color/16/google-logo.png" className="inline mr-2" />
              Google
            </button>
            <button className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition">
              <img src="https://img.icons8.com/color/16/facebook-new.png" className="inline mr-2" />
              Facebook
            </button>
          </div>
        </div>
      </form>

      {/* Animation styles */}
      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out both;
          }
        `}
      </style>
    </div>
  );
};

export default AuthPage;
