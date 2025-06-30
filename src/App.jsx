import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import HomePage from "./components/pages/HomePage";
import Landlords from "./components/pages/Landlords";
import Houses from "./components/pages/Houses";
import Location from "./components/pages/Location";
import Contact from "./components/pages/Contact";
import StatsSection from "./components/StatsSection";
import HouseDetailsPage from "./components/HouseDetailsPage";


// New pages outside layout
import AuthPage from "./components/pages/AuthPage";
import ProfileSetup from "./components/pages/ProfileSetup";
// import AuthPage from "./components/auth/AuthPage";
// import ProfileSetupPage from "./components/pages/ProfileSetupPage";

const App = () => {
  return (
    <Routes>
      {/* 🔓 Routes outside layout */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />

      {/* 🧱 Routes inside the main layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="landlords" element={<Landlords />} />
        <Route path="houses" element={<Houses />} />
        <Route path="houses/:id" element={<HouseDetailsPage />} />
        <Route path="location" element={<Location />} />
        <Route path="contact" element={<Contact />} />
        <Route path="con" element={<StatsSection />} />
      </Route>
    </Routes>
  );
};

export default App;
