// src/components/components/ProfileModal.jsx
import React from "react";
import {
  User as UserIcon,
  Mail as MailIcon,
  Shield as RoleIcon,
  Lock as BlockedIcon,
  CheckCircle as RegisteredIcon,
  X as CloseIcon,
  Phone as PhoneIcon,
  MapPin as AddressIcon,
  Info as InfoIcon,
} from "lucide-react";

const ProfileModal = ({ user, onClose, onBlockToggle, onPromote }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="flex justify-between items-center bg-purple-700 p-4">
          <h2 className="text-white text-lg font-semibold flex items-center gap-2">
            <UserIcon className="w-5 h-5" /> {user.fullName}
          </h2>
          <button onClick={onClose} className="text-white hover:text-gray-300">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <MailIcon className="w-4 h-4 text-gray-500" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <RoleIcon className="w-4 h-4 text-gray-500" />
              <span
                className={`inline-block px-2 py-1 text-sm rounded font-semibold ${
                  user.role === "superadmin"
                    ? "bg-red-100 text-red-700"
                    : user.role === "admin"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {user.role}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BlockedIcon className="w-4 h-4 text-gray-500" />
              <span
                className={`inline-block px-2 py-1 text-sm rounded font-semibold ${
                  user.blocked ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
                }`}
              >
                {user.blocked ? "Blocked" : "Active"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RegisteredIcon className="w-4 h-4 text-gray-500" />
              <span className="inline-block px-2 py-1 text-sm rounded bg-blue-100 text-blue-800 font-semibold">
                {user.fullyRegistered ? "Fully Registered" : "Incomplete"}
              </span>
            </div>
          </div>

          {/* Detailed Profile Info */}
          {user.profile && (
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <InfoIcon className="w-4 h-4" /> Profile Details
              </h3>
              {user.profile.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <PhoneIcon className="w-4 h-4" /> {user.profile.phone}
                </div>
              )}
              {user.profile.address && (
                <div className="flex items-center gap-2 text-gray-600">
                  <AddressIcon className="w-4 h-4" /> {user.profile.address}
                </div>
              )}
              {user.profile.department && (
                <div className="flex items-center gap-2 text-gray-600">
                  <RoleIcon className="w-4 h-4" /> Department: {user.profile.department}
                </div>
              )}
              {user.profile.notes && (
                <div className="flex items-start gap-2 text-gray-600">
                  <InfoIcon className="w-4 h-4 mt-1" /> Notes: {user.profile.notes}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="px-6 pb-6 flex justify-end gap-2">
          {onBlockToggle && (
            <button
              onClick={() => onBlockToggle(user.email)}
              className={`px-4 py-2 rounded font-semibold ${
                user.blocked
                  ? "bg-green-700 hover:bg-green-800 text-white"
                  : "bg-red-700 hover:bg-red-800 text-white"
              }`}
            >
              {user.blocked ? "Unblock" : "Block"}
            </button>
          )}
          {onPromote && user.role === "user" && (
            <button
              onClick={() => onPromote(user.email)}
              className="px-4 py-2 rounded bg-yellow-600 hover:bg-yellow-700 text-white font-semibold"
            >
              Promote to Admin
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-purple-700 hover:bg-purple-800 text-white font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
