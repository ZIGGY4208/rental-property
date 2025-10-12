import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCurrentUser, updateUserProfile, getUserByEmail, setCurrentUser } from "../data/localStorageUtils";
import { ImagePlus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [dob, setDob] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const profileImage = watch("profileImage");

  useEffect(() => {
    const current = getCurrentUser();
    if (current?.fullName) {
      const nameParts = current.fullName.trim().split(" ");
      if (nameParts.length === 1) {
        setValue("firstName", nameParts[0]);
      } else if (nameParts.length === 2) {
        setValue("firstName", nameParts[0]);
        setValue("lastName", nameParts[1]);
      } else if (nameParts.length > 2) {
        setValue("firstName", nameParts[0]);
        setValue("lastName", nameParts.slice(1).join(" ")); // everything after first name
      }
    }
    if (current?.email) {
      setValue("email", current.email);
    }
  }, [setValue]);

  const onSubmit = (data) => {
    const current = getCurrentUser();

    updateUserProfile(current.email, {
      ...data,
      role: "user",
      fullyRegistered: true,
    });

    const updatedUser = getUserByEmail(current.email);
    setCurrentUser(updatedUser.email);

    toast.success("Profile saved successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setValue("profileImage", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setValue("profileImage", reader.result);
      reader.readAsDataURL(file);
    }
  };

  const inputClasses =
    "w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md sm:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in-up"
      >
        <ToastContainer position="top-center" />
        <h2 className="text-2xl font-bold text-center text-purple-700 mt-2">
          Complete Your Profile
        </h2>

        {/* Profile Image Upload */}
        <div
          onClick={() => fileInputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-purple-600 mx-auto my-4 bg-white shadow flex items-center justify-center overflow-hidden cursor-pointer hover:ring hover:ring-purple-200 transition"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImagePlus className="text-purple-500 w-6 h-6 sm:w-8 sm:h-8" />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <input type="hidden" {...register("profileImage")} />

        {/* Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600 text-sm sm:text-base">First Name</label>
            <input
              {...register("firstName", { required: true })}
              className={inputClasses}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs sm:text-sm">Required</span>
            )}
          </div>
          <div>
            <label className="text-gray-600 text-sm sm:text-base">Last Name</label>
            <input
              {...register("lastName", { required: true })}
              className={inputClasses}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs sm:text-sm">Required</span>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-gray-600 text-sm sm:text-base">Email</label>
          <input
            type="email"
            className={inputClasses}
            readOnly
            {...register("email")}
          />
        </div>

        {/* Contacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600 text-sm sm:text-base">Phone Number</label>
            <input
              type="text"
              {...register("phone", { required: true })}
              className={inputClasses}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs sm:text-sm">Required</span>
            )}
          </div>
          <div>
            <label className="text-gray-600 text-sm sm:text-base">
              Secondary Contact (Optional)
            </label>
            <input
              type="text"
              {...register("secondaryContact")}
              className={inputClasses}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label className="text-gray-600 text-sm sm:text-base">Date of Birth</label>
          <DatePicker
            selected={dob}
            onChange={(date) => {
              setDob(date);
              setValue("dob", date ? date.toISOString().split("T")[0] : "");
            }}
            placeholderText="YYYY-MM-DD"
            dateFormat="yyyy-MM-dd"
            className={inputClasses}
            showPopperArrow={false}
            isClearable
          />
          {errors.dob && (
            <span className="text-red-500 text-xs sm:text-sm">
              Please enter a valid date (YYYY-MM-DD)
            </span>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          {["male", "female"].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer text-sm sm:text-base">
              <input
                type="radio"
                value={g}
                {...register("gender", { required: true })}
                className="accent-purple-600"
              />
              {g.charAt(0).toUpperCase() + g.slice(1)}
            </label>
          ))}
          {errors.gender && (
            <span className="text-red-500 text-xs sm:text-sm">Required</span>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="text-gray-600 text-sm sm:text-base">Location</label>
          <input
            {...register("location", { required: true })}
            placeholder="Enter your location"
            className={inputClasses}
          />
          {errors.location && (
            <span className="text-red-500 text-xs sm:text-sm">Required</span>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="text-gray-600 text-sm sm:text-base">
            Budget Range (FCFA/month)
          </label>
          <input
            {...register("budget", { required: true })}
            placeholder="e.g., 50,000 - 200,000"
            className={inputClasses}
          />
          {errors.budget && (
            <span className="text-red-500 text-xs sm:text-sm">Required</span>
          )}
        </div>

        {/* Additional Info */}
        <div>
          <label className="text-gray-600 text-sm sm:text-base">
            Tell us a bit about yourself and preferences
          </label>
          <textarea
            {...register("about")}
            className={`${inputClasses} h-28 resize-none`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-sm sm:text-base"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
