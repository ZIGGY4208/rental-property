import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const hasRun = useRef(false); // ✅ prevents double execution

  useEffect(() => {
    if (hasRun.current) return; // ✅ stop second StrictMode run
    hasRun.current = true;

    console.log("✅ OAuthSuccess mounted at:", location.pathname);

    // ✅ Only run logic if we are REALLY on /oauth-success
    if (location.pathname !== "/oauth-success") {
      console.warn("⛔ Not on oauth-success, aborting...");
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    console.log("🎯 Token from URL:", token);

    if (!token) {
      console.warn("⚠️ No token found — going to /auth");
      navigate("/auth", { replace: true });
      return;
    }

    localStorage.setItem("authToken", token);
    console.log("✅ Token saved:", token);

    navigate("/", { replace: true }); // ✅ replace prevents back-loop
  }, [navigate, location]);

  return <p>Signing you in...</p>;
}
