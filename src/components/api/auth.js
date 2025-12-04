import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // your backend auth routes
});

// REGISTER
export const registerUserApi = (data) => API.post("/register", data);

// LOGIN
export const loginUserApi = (data) => API.post("/login", data);

// FORGOT PASSWORD
export const forgotPasswordApi = (email) =>
  API.post("/forgot-password", { email });

// RESET PASSWORD
export const resetPasswordApi = (token, password) =>
  API.post(`/reset-password/${token}`, { password });
