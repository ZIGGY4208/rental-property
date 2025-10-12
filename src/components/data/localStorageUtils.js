// -----------------------------
// USER STORAGE LOGIC
// -----------------------------

/**
 * Save a user to localStorage
 * @param {Object} user - user object containing fullName, email, password, role, profile, fullyRegistered
 * @returns saved user object or null if email exists
 */
export const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check for existing email
  const existingUser = users.find((u) => u.email === user.email);
  if (existingUser) {
    console.warn("⚠️ User with this email already exists:", user.email);
    return null;
  }

  const newUser = {
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    role: user.role || "user",
    profile: user.profile || null,
    fullyRegistered: user.fullyRegistered || false,
    createdBy: user.createdBy || null,
    passwordResetCount: user.passwordResetCount || 0,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  console.log("✅ User saved:", newUser);
  return newUser;
};

/**
 * Get a user by email
 */
export const getUserByEmail = (email) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find((u) => u.email === email);
};

/**
 * Set current logged-in user
 */
export const setCurrentUser = (email) => {
  localStorage.setItem("currentUser", email);
  console.log("✅ Current user set:", email);
};

/**
 * Get current logged-in user
 */
export const getCurrentUser = () => {
  const email = localStorage.getItem("currentUser");
  return getUserByEmail(email);
};

/**
 * Update a user's profile
 */
export const updateUserProfile = (email, profileData) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.map((u) =>
    u.email === email
      ? { ...u, profile: profileData, fullyRegistered: profileData.fullyRegistered ?? u.fullyRegistered }
      : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  console.log("✅ User profile updated:", email, profileData);
};

/**
 * Get all admins (admin + superadmin)
 */
export const getAllAdmins = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.filter((u) => u.role === "admin" || u.role === "superadmin");
};

/**
 * Seed a superadmin dynamically (only once)
 * @param {Object} superAdminData - { fullName, email, password }
 */
export const seedSuperAdmin = (superAdminData) => {
  if (!superAdminData?.fullName || !superAdminData?.email || !superAdminData?.password) {
    console.error("❌ Cannot seed superadmin. Missing fullName, email, or password.");
    return null;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const superAdminExists = users.some((u) => u.role === "superadmin");

  if (!superAdminExists) {
    const superAdmin = {
      fullName: superAdminData.fullName,
      email: superAdminData.email,
      password: superAdminData.password,
      role: "superadmin",
      profile: null,
      fullyRegistered: true,
      createdBy: null,
      passwordResetCount: 0,
    };

    users.push(superAdmin);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("✅ Superadmin created:", superAdmin.email);
    return superAdmin;
  } else {
    console.log("ℹ️ Superadmin already exists.");
    return null;
  }
};

// -----------------------------
// HOUSE STORAGE LOGIC (CRUD)
// -----------------------------

const HOUSE_STORAGE_KEY = "uploaded_houses";

const generateHouseId = () => `house-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const saveHouse = (house) => {
  const houses = JSON.parse(localStorage.getItem(HOUSE_STORAGE_KEY)) || [];
  const houseWithId = { ...house, id: generateHouseId(), createdAt: new Date().toISOString() };
  houses.push(houseWithId);
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(houses));
  console.log("🏠 House saved:", houseWithId);
  return houseWithId;
};

export const getAllHouses = () => JSON.parse(localStorage.getItem(HOUSE_STORAGE_KEY)) || [];

export const getHouseById = (id) => getAllHouses().find((h) => h.id === id);

export const updateHouse = (id, updatedData) => {
  const houses = getAllHouses();
  const updatedHouses = houses.map((h) => (h.id === id ? { ...h, ...updatedData } : h));
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(updatedHouses));
  console.log("✏️ House updated:", id, updatedData);
  return updatedHouses.find((h) => h.id === id);
};

export const deleteHouse = (id) => {
  const houses = getAllHouses();
  const filteredHouses = houses.filter((h) => h.id !== id);
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(filteredHouses));
  console.log("🗑 House deleted:", id);
  return filteredHouses;
};

export const clearAllHouses = () => {
  localStorage.removeItem(HOUSE_STORAGE_KEY);
  console.log("🧹 All houses cleared");
};
