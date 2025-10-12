import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByEmail, saveUser, setCurrentUser } from "../data/localStorageUtils";
import { AtSign, Lock, Eye, EyeOff, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      const existing = getUserByEmail(email);
      if (existing) return toast.error("User already exists!");

      saveUser({ fullName, email, password, fullyRegistered: false });
      setCurrentUser(email);

      toast.success("Registration successful! Complete your profile.");
      navigate("/profile-setup");
    } else {
      const existing = getUserByEmail(email);
      if (!existing) return toast.error("Email not found!");
      if (existing.password !== password) return toast.error("Incorrect password!");

      setCurrentUser(email);
      toast.success("Login successful!");
      navigate(existing.fullyRegistered ? "/" : "/profile-setup");
    }
  };

  const bgClass = "bg-gray-100 text-gray-800";
  const inputClass = "bg-gray-100 text-gray-700 placeholder-gray-400";

  return (
    <div className={`min-h-screen ${bgClass} flex items-center justify-center px-4`}>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="animate-fade-in-up bg-white w-full max-w-md rounded-2xl shadow-xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          {isRegistering ? "Create an Account" : "Welcome Back!"}
        </h2>

        {isRegistering && (
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className={`w-full ${inputClass} px-12 py-3 rounded-lg outline-none`}
            />
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
          </div>
        )}

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

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          {isRegistering ? "Register" : "Login"}
        </button>

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
      </form>

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
