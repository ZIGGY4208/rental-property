import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import {  forgotPassword, verifyOTP } from "./api/auth.api";

const VerifyResetOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");

    if (!/^\d{6}$/.test(paste)) return;

    const pasteArray = paste.split("");
    setOtp(pasteArray);

    pasteArray.forEach((num, i) => {
      if (inputs.current[i]) inputs.current[i].value = num;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== 6) {
      return toast.error("Enter the 6-digit OTP");
    }

    setLoading(true);

    try {
      const res = await verifyOTP({ email, otp: code });

      toast.success(res.data.message || "OTP verified");

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      const message = error.response?.data?.message || "Invalid or expired OTP";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await forgotPassword({ email });
      toast.success("OTP resent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-purple-700">
          Verify OTP
        </h2>

        <p className="text-center text-sm text-gray-500">
          Enter the 6-digit code sent to your email
        </p>

        {/* OTP INPUTS */}

        <div className="flex justify-between gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold border rounded-lg focus:border-purple-600 focus:outline-none"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg flex items-center justify-center gap-2
          ${
            loading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Verifying...
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {/* RESEND OTP */}

        <button
          type="button"
          onClick={handleResend}
          className="w-full text-sm text-purple-600 underline"
        >
          Resend OTP
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

export default VerifyResetOTP;
