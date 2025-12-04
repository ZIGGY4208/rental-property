import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi, registerUserApi, forgotPasswordApi } from "../api/auth";
import { AtSign, Lock, Eye, EyeOff, User } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import GoogleLoginButton from "../GoogleLoginButton";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // REGISTER
        console.log("Registering user:", { fullName, email, password });
        const res = await registerUserApi({ fullName, email, password });
        console.log("Register response:", res.data);

        toast.success(res.data.message || "Registration successful!");

        // Navigate to profile-setup and pass user data via state
        navigate("/profile-setup", { state: { user: res.data.user, token: res.data.token } });
      } else {
        // LOGIN
        console.log("Logging in user:", { email, password });
        const res = await loginUserApi({ email, password });
        console.log("Login response:", res.data);

        // Save token for session
        localStorage.setItem("token", res.data.token);

        toast.success(res.data.message || "Login successful!");
        navigate("/"); // redirect home
      }
    } catch (error) {
      console.error("Auth error:", error);
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return toast.error("Please enter your email first");
    try {
      const res = await forgotPasswordApi(email);
      toast.success(res.data.message || "Password reset email sent!");
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
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

        {!isRegistering && (
          <div className="text-right mt-2">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-purple-600 font-medium underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <div className="relative flex items-center justify-center">
          <hr className="w-full border-gray-300" />
          <span className="absolute bg-white px-2 text-gray-500 text-sm">OR</span>
        </div>

        <GoogleLoginButton />

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
    </div>
  );
};

export default AuthPage;
