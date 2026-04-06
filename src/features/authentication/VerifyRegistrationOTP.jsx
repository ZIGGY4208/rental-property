import React, { useState, useRef, useEffect } from "react";
import { MailCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { verifyRegistrationOTP, resendRegistrationOTP } from "./api/auth.api";
import { useLocation, useNavigate } from "react-router-dom";
import EmailVerifiedModal from "./EmailVerifiedModal";

const VerifyRegistrationOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/auth");
    }
  }, [email, navigate]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const inputs = useRef([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  /* OTP INPUT HANDLER */

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    const otpCode = newOtp.join("");

    if (otpCode.length === 6 && !newOtp.includes("")) {
      handleVerify(otpCode);
    }
  };

  /* BACKSPACE NAVIGATION */

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  /* PASTE OTP */

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").trim();

    if (!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split("");
    setOtp(newOtp);

    inputs.current[5]?.focus();

    handleVerify(paste);
  };

  /* VERIFY OTP */

 const handleVerify = async (code = otp.join("")) => {
   if (loading) return;

   if (code.length !== 6) {
     toast.error("Enter the complete 6-digit OTP");
     return;
   }

   try {
     setLoading(true);
     setError(false);

     await verifyRegistrationOTP({
       email,
       otp: code,
     });

     toast.success("Email verified successfully 🎉");

     setShowSuccessModal(true);
   } catch (err) {
     setError(true);

     toast.error(
       err.response?.data?.message || "Invalid or expired verification code",
     );
   } finally {
     setLoading(false);
   }
 };

  /* RESEND OTP */

  const handleResendOTP = async () => {
    if (resending) return;

    try {
      setResending(true);

      const res = await resendRegistrationOTP({ email });

      toast.success(res.data.message || "OTP resent successfully");

      /* Clear OTP inputs */

      setOtp(["", "", "", "", "", ""]);

      setError(false);

      /* Focus first input again */

      inputs.current[0]?.focus();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* ICON */}

          <div className="flex justify-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <MailCheck className="text-purple-600" size={28} />
            </div>
          </div>

          {/* TITLE */}

          <h2 className="text-xl sm:text-2xl font-bold text-center text-purple-700 mb-2">
            Verify Your Email
          </h2>

          <p className="text-center text-gray-500 text-sm sm:text-base mb-6">
            Enter the 6-digit code sent to <b>{email}</b>
          </p>

          {/* OTP INPUT */}

          <div
            className="flex justify-center gap-2 sm:gap-3 mb-6"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength="1"
                inputMode="numeric"
                autoComplete="one-time-code"
                className={`w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold border rounded-md outline-none transition
                ${
                  error
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-2 focus:ring-purple-600"
                }`}
              />
            ))}
          </div>

          {/* VERIFY BUTTON */}

          <button
            onClick={() => handleVerify()}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition
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

          <p className="text-center text-sm text-gray-500 mt-5">
            Didn’t receive the code?
            <button
              onClick={handleResendOTP}
              disabled={resending}
              className={`ml-1 ${
                resending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-purple-600 hover:underline"
              }`}
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          </p>
        </div>
      </div>

      {/* SUCCESS MODAL */}

      <EmailVerifiedModal
        isOpen={showSuccessModal}
        onContinue={() => navigate("/profile-setup")}
      />
    </>
  );
};

export default VerifyRegistrationOTP;
