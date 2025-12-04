import React from "react";
import {
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, onLogout, anchorRef }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  const style = {
    position: "absolute",
    top: rect.bottom + window.scrollY + 10,
    left: rect.left + window.scrollX,
    width: "260px",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
    zIndex: 9999,
    padding: "10px 0",
  };

  return (
    <div style={style} className="animate-fade-in">
      {/* ✅ USER INFO */}
      <div className="px-4 py-3 border-b">
        <p className="font-semibold text-gray-800">
          {user.profile?.firstName
            ? `${user.profile.firstName} ${user.profile.lastName || ""}`
            : user.fullName}
        </p>
        <p className="text-xs text-gray-500">{user.email}</p>
      </div>

      {/* ✅ MAIN OPTIONS */}
      <MenuItem
        icon={User}
        label="Profile"
        onClick={() => navigate("/profile")}
      />
      <MenuItem
        icon={Bell}
        label="Notifications"
        onClick={() => navigate("/notifications")}
      />
      <MenuItem
        icon={MessageCircle}
        label="Messages"
        onClick={() => navigate("/chats")}
      />
      <MenuItem
        icon={Settings}
        label="Settings"
        onClick={() => navigate("/settings")}
      />

      {/* ✅ ADMIN OPTIONS (CONTROLLED) */}
      {(user.role === "admin" || user.role === "super-admin") && (
        <>
          <div className="my-2 border-t" />
          <MenuItem
            icon={Shield}
            label="Administration"
            onClick={() => navigate("/admin")}
            highlight
          />
        </>
      )}

      {/* ✅ SUPER ADMIN ONLY */}
      {user.role === "super-admin" && (
        <MenuItem
          icon={Shield}
          label="Super Admin Panel"
          onClick={() => navigate("/super-admin")}
          highlight
        />
      )}

      {/* ✅ LOGOUT */}
      <div className="mt-2 border-t">
        <MenuItem icon={LogOut} label="Logout" danger onClick={onLogout} />
      </div>
    </div>
  );
};

/* ✅ Reusable Menu Item */
const MenuItem = ({ icon: Icon, label, onClick, danger, highlight }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition
      ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : highlight
          ? "text-indigo-600 hover:bg-indigo-50 font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export default UserMenu;
