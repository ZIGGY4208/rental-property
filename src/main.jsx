import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { AdminAuthProvider } from "./components/dashboardComponents/AdminAuthProvider";
import { Toaster } from "react-hot-toast";
// import { AdminAuthProvider } from "./context/AdminAuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false}/>
        <App />
      </BrowserRouter>
    </AdminAuthProvider>
  </React.StrictMode>
);
