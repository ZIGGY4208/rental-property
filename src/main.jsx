import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { AdminAuthProvider } from "./components/dashboardComponents/AdminAuthProvider";
import { AuthProvider } from "./features/authentication/context/AuthContext";
import { Toaster } from "react-hot-toast";
import { AdminAuthProvider } from "./features/Admin.authentication/AdminAuthProvider";

console.log("🚀 Application starting...");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Admin authentication context */}
      <AdminAuthProvider>
        {/* User authentication context */}
        <AuthProvider>
          {/* Global toast notifications */}
          <Toaster position="top-right" reverseOrder={false} />

          {/* Main Application */}
          <App />
        </AuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
