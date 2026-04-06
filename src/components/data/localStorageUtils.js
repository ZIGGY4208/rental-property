// -----------------------------
// UTILITY
// -----------------------------
const safeParse = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    console.warn(`⚠️ Corrupted data in ${key}, resetting.`);
    localStorage.removeItem(key);
    return [];
  }
};

// -----------------------------
// USER STORAGE LOGIC
// -----------------------------
export const saveUser = (user) => {
  const users = safeParse("users");
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) return null;

  const isFirstUser = users.length === 0;

  const newUser = {
    fullName: user.fullName,
    email: user.email,
    password: user.password,
    role: isFirstUser ? "superadmin" : "user", // Single authoritative role
    profile: user.profile || {},               // Only personal info here
    fullyRegistered: isFirstUser ? true : false,
    createdBy: user.createdBy || null,
    passwordResetCount: 0,
    blocked: false,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // Automatically set session if first user
  if (isFirstUser) {
    setCurrentUser(newUser.email);
    setCurrentAdmin(newUser.email);
    console.log("🔐 First user auto-promoted to superadmin");
  }

  console.log("✅ User saved:", newUser);
  return newUser;
};

export const getUserByEmail = (email) => safeParse("users").find(u => u.email === email);

// -----------------------------
// CURRENT USER SESSION
// -----------------------------
export const setCurrentUser = (email) => localStorage.setItem("currentUser", email);

export const getCurrentUser = () => {
  const email = localStorage.getItem("currentUser");
  return email ? getUserByEmail(email) : null;
};

// -----------------------------
// CURRENT ADMIN SESSION
// -----------------------------
const ADMIN_KEY = "currentAdmin";

export const setCurrentAdmin = (email) => localStorage.setItem(ADMIN_KEY, email);

export const getCurrentAdmin = () => {
  const email = localStorage.getItem(ADMIN_KEY);
  return email ? getUserByEmail(email) : null;
};

// -----------------------------
// USER MANAGEMENT
// -----------------------------
export const getAllAdmins = () => safeParse("users").filter(u => u.role === "admin" || u.role === "superadmin");

export const updateUserProfile = (email, profileData) => {
  const users = safeParse("users");
  const updatedUsers = users.map(u =>
    u.email === email
      ? { ...u, profile: { ...u.profile, ...profileData }, fullyRegistered: profileData.fullyRegistered ?? u.fullyRegistered }
      : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return updatedUsers.find(u => u.email === email);
};

export const promoteUser = (email, newRole) => {
  const users = safeParse("users");
  const updatedUsers = users.map(u =>
    u.email === email ? { ...u, role: newRole, fullyRegistered: true } : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  // Update session if promoted user is current admin
  const currentAdmin = getCurrentAdmin();
  if (currentAdmin?.email === email) setCurrentAdmin(email);

  console.log(`✅ User promoted: ${email} → ${newRole}`);
  return updatedUsers.find(u => u.email === email);
};

export const toggleBlockUser = (email) => {
  const users = safeParse("users");
  const updatedUsers = users.map(u => u.email === email ? { ...u, blocked: !u.blocked } : u);
  localStorage.setItem("users", JSON.stringify(updatedUsers));
  return updatedUsers.find(u => u.email === email);
};

export const hasAnyUser = () => safeParse("users").length > 0;

// -----------------------------
// HOUSE STORAGE LOGIC (CRUD)
// -----------------------------
const HOUSE_STORAGE_KEY = "uploaded_houses";

const generateHouseId = () => `house-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const saveHouse = (house) => {
  const houses = safeParse(HOUSE_STORAGE_KEY);
  const houseWithId = { ...house, id: generateHouseId(), createdAt: new Date().toISOString() };
  houses.push(houseWithId);
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(houses));
  return houseWithId;
};

export const getAllHouses = () => safeParse(HOUSE_STORAGE_KEY);

export const getHouseById = (id) => getAllHouses().find(h => h.id === id);

export const updateHouse = (id, updatedData) => {
  const houses = getAllHouses();
  const updatedHouses = houses.map(h => h.id === id ? { ...h, ...updatedData } : h);
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(updatedHouses));
  return updatedHouses.find(h => h.id === id);
};

export const deleteHouse = (id) => {
  const houses = getAllHouses();
  const filteredHouses = houses.filter(h => h.id !== id);
  localStorage.setItem(HOUSE_STORAGE_KEY, JSON.stringify(filteredHouses));
  return filteredHouses;
};

export const clearAllHouses = () => {
  localStorage.removeItem(HOUSE_STORAGE_KEY);
};

// -----------------------------
// OPTIONAL MIGRATION: remove role from old profile objects
// -----------------------------
export const migrateUsersProfile = () => {
  const users = safeParse("users");
  const cleaned = users.map(u => {
    if (u.profile?.role) delete u.profile.role;
    if (u.profile?.fullyRegistered !== undefined) delete u.profile.fullyRegistered;
    return u;
  });
  localStorage.setItem("users", JSON.stringify(cleaned));
  console.log("✅ User profiles migrated to single top-level role");
};
