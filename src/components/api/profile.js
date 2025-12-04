import axios from "axios";

// ✅ Base API URL
const API_BASE = "http://localhost:5000/api/profiles";


// CREATE PROFILE API (for newly registering users)
export const createProfileApi = async (profileData) => {
  try {
    console.log("Sending profile create:", profileData);
    const token = localStorage.getItem("token");
    return await axios.post(`${API_BASE}/create`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  } catch (err) {
    console.error("Failed to create profile:", err);
    throw err;
  }
};


// ✅ Update profile (backend identifies the user from token/session)
export const updateProfileApi = async (profileData) => {
  try {
    console.log("Sending profile update:", profileData);
    // Assuming backend uses token in headers or session cookies
    const token = localStorage.getItem("token"); // if using JWT
    return await axios.put(`${API_BASE}/me`, profileData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // if backend uses cookies
    });
  } catch (err) {
    console.error("Failed to update profile:", err);
    throw err;
  }
};

// ✅ Get profile (backend identifies the user from token/session)
export const getProfileApi = async () => {
  try {
    console.log("Fetching profile for logged-in user");
    const token = localStorage.getItem("token");
    return await axios.get(`${API_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    throw err;
  }
};
