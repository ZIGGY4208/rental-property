import fs from "fs";
import path from "path";

const SEARCH_TERM = "/login";
const ROOT_DIR = "./src";

function searchInFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  if (content.includes(SEARCH_TERM)) {
    console.log(`FOUND in: ${filePath}`);
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      if (
        file.endsWith(".js") ||
        file.endsWith(".jsx") ||
        file.endsWith(".ts") ||
        file.endsWith(".tsx")
      ) {
        searchInFile(fullPath);
      }
    }
  });
}

console.log("Scanning project for '/login'...\n");

scanDirectory(ROOT_DIR);

console.log("\nScan complete.");
