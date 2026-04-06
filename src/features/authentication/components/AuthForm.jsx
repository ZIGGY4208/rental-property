import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// API functions
import { loginUser, registerUser, forgotPassword } from "../api/auth.api";

// Auth context hook
import { useAuth } from "../hooks/useAuth";

import {
  AtSign,
  Lock,
  Eye,
  EyeOff,
  User,
  LogIn,
  UserPlus,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";
import SocialLoginButtons from "./SocialLoginButtons";

const AuthForm = ({ isLogin, mobile }) => {
  console.log("📄 AuthForm component loaded");

  // Toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Access login function from AuthContext
  const { login } = useAuth();

  console.log("🔑 AuthContext login function ready");

  /* -------------------------
     PASSWORD STRENGTH CHECK
  ------------------------- */

  const calculateStrength = () => {
    let score = 0;

    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) {
      return { label: "Weak", color: "bg-rose-500", width: "30%" };
    }

    if (score === 3 || score === 4) {
      return { label: "Medium", color: "bg-purple-500", width: "65%" };
    }

    return { label: "Strong", color: "bg-purple-700", width: "100%" };
  };

  const strength = calculateStrength();

  /* -------------------------
     FORM SUBMISSION
  ------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("📨 Form submitted");

    if (loading) return;

    setLoading(true);

    try {
      /* -------------------------
         REGISTRATION FLOW
      ------------------------- */

      if (!isLogin) {
        console.log("📝 Registering user...");
        console.log("📦 Payload:", { fullName, email, password });

        const res = await registerUser({ fullName, email, password });

        console.log("✅ Registration response:", res.data);

        toast.success(res.data.message || "Registration successful!");

        // Redirect to OTP verification page
        navigate("/verify-registration-otp", {
          state: { email },
        });
      } else {
        /* -------------------------
           LOGIN FLOW (AuthContext)
        ------------------------- */

        console.log("🔐 Attempting login...");
        console.log("📦 Login payload:", { email, password });

        // Call login function from AuthContext
        const res = await login({ email, password });

        console.log("✅ Login successful:", res);

        toast.success(res.message || "Login successful!");

        // Redirect to homepage
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Authentication error:", error);

      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------
     FORGOT PASSWORD
  ------------------------- */

  const handleForgotPassword = async () => {
    console.log("🔑 Forgot password clicked");

    if (!email) {
      return toast.error("Please enter your email first");
    }

    try {
      console.log("📡 Sending forgot password request...");

      const res = await forgotPassword(email);

      console.log("✅ Forgot password response:", res.data);

      toast.success(res.data.message || "Password reset email sent!");
    } catch (error) {
      console.error("❌ Forgot password error:", error);

      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  /* -------------------------
     COMPONENT UI
  ------------------------- */

  return (
    <div className="w-full flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold text-purple-700 text-center">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>

        {/* FULL NAME FIELD (REGISTER ONLY) */}

        {!isLogin && (
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-10 py-3 bg-gray-100 rounded-lg border border-transparent focus:border-purple-600 focus:outline-none"
            />

            <User className="absolute left-3 top-3 text-purple-500" />
          </div>
        )}

        {/* EMAIL FIELD */}

        <div className="relative">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-10 py-3 bg-gray-100 rounded-lg border border-transparent focus:border-purple-600 focus:outline-none"
          />

          <AtSign className="absolute left-3 top-3 text-purple-500" />
        </div>

        {/* PASSWORD FIELD */}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-10 py-3 bg-gray-100 rounded-lg border border-transparent focus:border-purple-600 focus:outline-none"
          />

          <Lock className="absolute left-3 top-3 text-purple-500" />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* PASSWORD STRENGTH BAR */}

        {!isLogin && password && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className={`${strength.color} h-2 transition-all duration-500 ease-in-out`}
                style={{ width: strength.width }}
              ></div>
            </div>

            <p
              className={`text-sm font-medium ${
                strength.label === "Weak"
                  ? "text-rose-500"
                  : strength.label === "Medium"
                    ? "text-purple-500"
                    : "text-purple-700"
              }`}
            >
              {strength.label} password
            </p>
          </div>
        )}

        {/* FORGOT PASSWORD */}

        {isLogin && (
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm text-purple-600 underline"
          >
            Forgot Password
          </button>
        )}

        {/* SOCIAL LOGIN */}

        <div className="mt-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <SocialLoginButtons />
        </div>

        {/* SUBMIT BUTTON */}

        <button
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg transition
          ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Processing...
            </>
          ) : isLogin ? (
            <>
              <LogIn size={18} />
              Login
            </>
          ) : (
            <>
              <UserPlus size={18} />
              Register
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
