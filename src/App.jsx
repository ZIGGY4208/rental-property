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

import AuthPage from "./components/pages/AuthPage";
import ProfileSetup from "./components/pages/ProfileSetup";
import ProductPage from "./components/ProductPage";
import Dashboardpage from "./components/pages/DashboardPage";
import AdminLayout from "./layout/AdminLayout";
import { adminRoutes } from "./components/routes/adminRoutes";
import HouseUploadPage from "./components/pages/HouseUploadPage";


import AdminLogin from "./components/dashboardComponents/AdminLogin";

// import AdminLogin from "./components/pages/AdminLogin";
import ProtectedRoute from "./components/dashboardComponents/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* 🔐 Admin Login (outside of layout) */}
      <Route path="/Admin" element={<AdminLogin />} />

      {/* 🔐 Protected Admin Routes under AdminLayout */}
      <Route
        path="/Admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {adminRoutes.map((route) => {
          const Component = route.component;
          const path = route.path.replace('/Admin/', '');
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Route>

      {/* 🔓 Public Auth Pages */}
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/product-page" element={<ProductPage />} />
      <Route path="/dashboard" element={<Dashboardpage />} />
      <Route path="/uploadPage" element={<HouseUploadPage />} />
      <Route path="/upload" element={<div>hello world</div>} />


      {/* 🧱 Public User-Facing Layout */}
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
