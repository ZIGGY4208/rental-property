import axios from "axios";

/* =================================
   AXIOS INSTANCE
================================= */

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true,
});

/* =================================
   ATTACH TOKEN TO EVERY REQUEST
================================= */

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =================================
   AUTH API FUNCTIONS
================================= */

// Register
export const registerUser = (data) => API.post("/register", data);

// Verify registration OTP
export const verifyRegistrationOTP = (data) =>
  API.post("/verify-registration-otp", data);

// Resend registration OTP
export const resendRegistrationOTP = (data) =>
  API.post("/resend-registration-otp", data);

// Login
export const loginUser = (data) => API.post("/login", data);

// Forgot password
export const forgotPassword = (data) => API.post("/forgot-password", data);

// Verify reset OTP
export const verifyOTP = (data) => API.post("/verify-otp", data);

// Reset password
export const resetPassword = (data) => API.post("/reset-password", data);

// Get logged-in user
export const getCurrentUser = () => API.get("/me");
