import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCurrentUser, updateUserProfile } from "../data/localStorageUtils";
import { ImagePlus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [role, setRole] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const profileImage = watch("profileImage");

  const onSubmit = (data) => {
    if (!role) return toast.error("Please select Tenant or Landlord.");
    const current = getCurrentUser();
    updateUserProfile(current.email, { ...data, role });
    toast.success("Profile saved successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("profileImage", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8 space-y-6 relative animate-fade-in-up"
      >
        <ToastContainer position="top-center" />

        {/* Profile Image Upload Box */}
        <div
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-28 h-28 rounded-full border-4 border-purple-600 mx-auto -mt-24 mb-4 bg-white shadow flex items-center justify-center overflow-hidden cursor-pointer hover:ring hover:ring-purple-200 transition"
        >
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus className="text-purple-500 w-8 h-8" />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-purple-700 mt-2">
          {role ? `Complete Your ${role[0].toUpperCase() + role.slice(1)} Profile` : "Set Up Your Profile"}
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-6">
          {["tenant", "landlord"].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                className="accent-purple-600"
                checked={role === r}
                onChange={() => setRole(r)}
              />
              <span className="text-gray-700 capitalize">{r}</span>
            </label>
          ))}
        </div>

        {/* Conditional form fields */}
        {role && (
          <>
            {/* Gender */}
            <div className="flex items-center gap-6">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={g}
                    {...register("gender", { required: true })}
                    className="accent-purple-600"
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
              {errors.gender && <span className="text-red-500 text-sm">Required</span>}
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                />
                {errors.firstName && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div>
                <label className="text-gray-600">Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                />
                {errors.lastName && <span className="text-red-500 text-sm">Required</span>}
              </div>
            </div>

            {/* Email (read-only) */}
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                value={getCurrentUser()?.email || ""}
                readOnly
                {...register("email")}
              />
            </div>

            {/* Address, Phone, DOB */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Phone Number</label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                />
                {errors.phone && <span className="text-red-500 text-sm">Required</span>}
              </div>
              <div>
                <label className="text-gray-600">Date of Birth</label>
                <input
                  type="date"
                  {...register("dob", { required: true })}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                />
              </div>
            </div>

            {/* Location & Postal Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600">Location</label>
                <input
                  {...register("location")}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                />
              </div>
              <div>
                <label className="text-gray-600">Postal Code</label>
                <input
                  {...register("postalCode")}
                  className="w-full bg-gray-100 px-4 py-3 rounded-lg"
                />
              </div>
            </div>

            {/* About */}
            <div>
              <label className="text-gray-600">
                {role === "tenant"
                  ? "Tell us about yourself and preferences"
                  : "Describe the properties you manage or own"}
              </label>
              <textarea
                {...register("about")}
                className="w-full bg-gray-100 px-4 py-3 rounded-lg h-28 resize-none"
              />
            </div>

            {/* Hidden image field */}
            <input type="hidden" {...register("profileImage")} />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Save & Continue
            </button>
          </>
        )}
      </form>

      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfileSetup;
