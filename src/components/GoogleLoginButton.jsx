import React from "react";

const GoogleLoginButton = () => {
  const BACKEND_URL = "http://localhost:5000/api/auth/google";

  const handleGoogleLogin = () => {
    window.location.href = BACKEND_URL; 
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition flex items-center justify-center gap-2"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
