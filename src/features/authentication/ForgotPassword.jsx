import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "./api/auth.api";
import { AtSign, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email");
    }

    setLoading(true);

    try {
      const res = await forgotPassword({ email });

      toast.success(res.data.message || "OTP sent to your email");

      navigate("/verify-reset-otp", {
        state: { email },
      });
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-5"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center">
          Enter your email to receive a reset OTP
        </p>

        <div className="relative">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-10 py-3 bg-gray-100 rounded-lg border border-transparent focus:border-purple-600 focus:outline-none text-sm sm:text-base"
          />

          <AtSign className="absolute left-3 top-3 text-purple-500" />
        </div>

        {/* SEND OTP BUTTON */}

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition
          ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Sending OTP...
            </>
          ) : (
            "Send Reset OTP"
          )}
        </button>

        {/* BACK TO LOGIN */}

        <button
          type="button"
          onClick={() => navigate("/auth")}
          className="w-full flex items-center justify-center gap-2 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition"
        >
          <ArrowLeft size={18} />
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
