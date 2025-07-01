// -----------------------------
// USER STORAGE LOGIC
// -----------------------------

// Save user to localStorage
export const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Saving new user:", user);
  users.push({
    fullName: user.fullName,
    email: user.email,
    password: user.password,
  });
  localStorage.setItem("users", JSON.stringify(users));
  console.log("All users after saving:", users);
};

// Get a user by email
export const getUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email);
  console.log(`Fetching user by email: ${email}`, user);
  return user;
};

// Set the current user by email
export const setCurrentUser = (email) => {
  console.log(`Setting current user: ${email}`);
  localStorage.setItem("currentUser", email);
};

// Get the currently logged-in user
export const getCurrentUser = () => {
  const email = localStorage.getItem("currentUser");
  const user = getUserByEmail(email);
  console.log("Getting current user:", user);
  return user;
};

// Update the user's profile info
export const updateUserProfile = (email, profile) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Updating profile for:", email, "with data:", profile);
  const updated = users.map((u) =>
    u.email === email ? { ...u, profile, role: profile.role } : u
  );
  localStorage.setItem("users", JSON.stringify(updated));
  console.log("Users after profile update:", updated);
};

// -----------------------------
// HOUSE STORAGE LOGIC
// -----------------------------

const HOUSE_STORAGE_KEY = "uploaded_house_data";

// Save house data
export const saveHouseToStorage = (house) => {
  console.log("Saving house data:", house);
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(house));
};

// Get house data
export const getStoredHouse = () => {
  const data = localStorage.getItem(HOUSE_STORAGE_KEY);
  const parsed = data ? JSON.parse(data) : null;
  console.log("Retrieved stored house data:", parsed);
  return parsed;
};

// Remove stored house data
export const clearStoredHouse = () => {
  console.log("Clearing stored house data");
  localStorage.removeItem(HOUSE_STORAGE_KEY);
};
