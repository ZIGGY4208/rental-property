import React from "react";
import { CheckCircle } from "lucide-react";

const EmailVerifiedModal = ({ isOpen, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl animate-scaleIn">
        <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Account Created
        </h3>

        <p className="text-gray-500 mb-6">
          Your email has been successfully verified.
        </p>

        <button
          onClick={onContinue}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EmailVerifiedModal;
