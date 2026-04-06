const fs = require("fs");
const path = require("path");
const glob = require("glob");

const SRC = path.join(__dirname, "src");

/*
NEW STRUCTURE
*/
const folders = [
  "components/shared",
  "components/header",
  "components/footer",
  "features/auth",
  "features/properties",
  "features/admin",
  "features/propertyUpload",
  "hooks",
  "context",
  "services",
  "pages"
];

/*
FILES TO MOVE
(oldPath -> newPath)
ONLY EDIT HERE IF NEEDED
*/
const moveMap = {
  "components/api/auth.js": "services/authService.js",
  "components/api/profile.js": "services/profileService.js",

  "components/hooks/useAuth.js": "hooks/useAuth.js",

  "components/data/AdminAuthContext.js": "context/AdminAuthContext.js",
  "components/data/useAdminAuth.js": "hooks/useAdminAuth.js",

  "components/pages/HomePage.jsx": "pages/HomePage.jsx",
  "components/pages/HousesPage.jsx": "pages/HousesPage.jsx",
  "components/pages/Contact.jsx": "pages/Contact.jsx",
  "components/pages/DashboardPage.jsx": "pages/DashboardPage.jsx",

  "components/GoogleLoginButton.jsx": "features/auth/GoogleLoginButton.jsx",

  "components/PropertyCard.jsx": "features/properties/PropertyCard.jsx",
  "components/PropertyGrid.jsx": "features/properties/PropertyGrid.jsx",
  "components/PropertySlider.jsx": "features/properties/PropertySlider.jsx",

  "components/HouseCard.jsx": "features/properties/HouseCard.jsx",
  "components/HouseMap.jsx": "features/properties/HouseMap.jsx",

  "components/houseUploadComponents/ProductUpload.jsx": "features/propertyUpload/ProductUpload.jsx",
  "components/houseUploadComponents/HouseDetailsForm.jsx": "features/propertyUpload/HouseDetailsForm.jsx",
  "components/houseUploadComponents/HouseImagesAndAmenities.jsx": "features/propertyUpload/HouseImagesAndAmenities.jsx",

  "components/dashboardComponents/Sidebar.jsx": "features/admin/Sidebar.jsx",
  "components/dashboardComponents/TopBar.jsx": "features/admin/TopBar.jsx",
  "components/dashboardComponents/StatCard.jsx": "features/admin/StatCard.jsx"
};

/*
CREATE FOLDERS
*/
function createFolders() {
  folders.forEach(folder => {
    const full = path.join(SRC, folder);
    fs.mkdirSync(full, { recursive: true });
  });
}

/*
MOVE FILES
*/
function moveFiles() {
  Object.entries(moveMap).forEach(([oldPath, newPath]) => {
    const src = path.join(SRC, oldPath);
    const dest = path.join(SRC, newPath);

    if (fs.existsSync(src)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.renameSync(src, dest);
      console.log("Moved:", oldPath, "->", newPath);
    }
  });
}

/*
FIX IMPORT PATHS
*/
function fixImports() {
  const files = glob.sync(`${SRC}/**/*.{js,jsx}`);

  files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");

    Object.entries(moveMap).forEach(([oldPath, newPath]) => {
      const oldImport = oldPath.replace("components/", "../components/");
      const newImport = newPath.replace("src/", "");

      content = content.replaceAll(oldImport, newImport);
    });

    fs.writeFileSync(file, content);
  });

  console.log("Imports updated.");
}

/*
DELETE OLD FOLDERS
*/
function cleanup() {
  const oldFolders = [
    "components/api",
    "components/data",
    "components/hooks",
    "components/dashboardComponents",
    "components/houseUploadComponents"
  ];

  oldFolders.forEach(folder => {
    const full = path.join(SRC, folder);

    if (fs.existsSync(full)) {
      fs.rmSync(full, { recursive: true, force: true });
      console.log("Removed:", folder);
    }
  });
}

/*
RUN
*/
console.log("Reorganizing project...\n");

createFolders();
moveFiles();
fixImports();
cleanup();

console.log("\nDone. Project reorganized.");