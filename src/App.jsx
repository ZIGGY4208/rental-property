import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import HomePage from "./components/pages/HomePage";
import Landlords from "./components/pages/Landlords";
import Houses from "./components/pages/Houses";
import Location from "./components/pages/Location";
import Contact from "./components/pages/Contact";
import StatsSection from "./components/StatsSection";
import HouseDetailsPage from "./components/HouseDetailsPage";

import ProfileSetup from "./components/pages/ProfileSetup";
import ProductPage from "./components/ProductPage";
import Dashboardpage from "./components/pages/DashboardPage";

import AdminLayout from "./layout/AdminLayout";
import { adminRoutes } from "./components/routes/adminRoutes";
// import AdminLogin from "./components/pages/AdminLogin";

import ProtectedRoute from "./features/Admin.authentication/AdminProtectedRoute";

import HouseUploadPage from "./components/pages/HouseUploadPage";
import OAuthSuccess from "./components/pages/OAuthSuccess";

import ResetPasswordPage from "./features/authentication/ResetPasswordPage";
import AuthPage from "./features/authentication/AuthPage";
import VerifyRegistrationOTP from "./features/authentication/VerifyRegistrationOTP";
import ForgotPassword from "./features/authentication/ForgotPassword";
import VerifyResetOTP from "./features/authentication/VerifyResetOTP";
import UserProtectedRoute from "./features/authentication/components/UserProtectedRoute";
// import AdminProtectedRoute from "./features/Admin.authentication/AdminProtectedRoute";
import AdminLogin from "./features/Admin.authentication/AdminLogin";
import AdminProtectedRoute from "./features/Admin.authentication/AdminProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/* ---------------- ADMIN LOGIN ---------------- */}
      <Route path="/Admin" element={<AdminLogin />} />

      {/* ---------------- PROTECTED ADMIN ROUTES ---------------- */}
      <Route
        path="/Admin/*"
        element={
          <AdminProtectedRoute>
            <AdminLayout />
          </AdminProtectedRoute>
        }
      >
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}

        <Route path="houses/upload" element={<HouseUploadPage />} />
      </Route>

      {/* ---------------- AUTH PAGES (PUBLIC) ---------------- */}
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/verify-registration-otp"
        element={<VerifyRegistrationOTP />}
      />
      <Route path="/verify-reset-otp" element={<VerifyResetOTP />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* ---------------- USER PROTECTED ROUTES ---------------- */}

      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <ProfileSetup />
          </ProtectedRoute>
        }
      />

      {/* UI testing only */}
      {/* <Route path="/dashboard" element={<Dashboardpage />} /> */}
      {/* <Route path="/product-page" element={<ProductPage />} /> */}

      {/* ---------------- PUBLIC USER LAYOUT ---------------- */}

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="landlords" element={<Landlords />} />

        {/* Protected houses listing */}
        <Route
          path="houses"
          element={
            <UserProtectedRoute>
              <Houses />
            </UserProtectedRoute>
          }
        />

        {/* Public single house view */}
        <Route path="houses/:id" element={<HouseDetailsPage />} />

        {/* Protected pages */}
        <Route
          path="location"
          element={
            <UserProtectedRoute>
              <Location />
            </UserProtectedRoute>
          }
        />

        <Route
          path="contact"
          element={
            <UserProtectedRoute>
              <Contact />
            </UserProtectedRoute>
          }
        />

        <Route path="con" element={<StatsSection />} />
      </Route>
    </Routes>
  );
};

export default App;
