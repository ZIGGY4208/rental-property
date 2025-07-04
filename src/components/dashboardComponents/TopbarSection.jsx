import React, { useState } from "react";
import TopBar from "./TopBar";

const TopbarSection = () => {
  const [language, setLanguage] = useState("ENG");
  const user = {
    name: "Dr. Norica",
    avatar: "/ai.jpg",
  };

  const handleSearch = (term) => {
    console.log("Searching for:", term);
    // Trigger search or filter logic here
  };

  return (
    <TopBar
      user={user}
      currentLanguage={language}
      availableLanguages={["ENG", "FRA", "ESP"]}
      onLanguageChange={setLanguage}
      onSearch={handleSearch}
    />
  );
};

export default TopbarSection;
