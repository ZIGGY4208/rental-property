import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createProfileApi, updateProfileApi, getProfileApi } from "../api/profile";
import { ImagePlus } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef();
  const [dob, setDob] = useState(null);
  const [existingProfile, setExistingProfile] = useState(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const profileImage = watch("profileImage");

  const user = location.state?.user;
  const token = location.state?.token;

  // Prefill form & check if profile exists
  useEffect(() => {
    if (!user) {
      toast.error("No user data found. Please login again.");
      navigate("/login");
      return;
    }

    setValue("email", user.email);
    setValue("firstName", user.fullName || "");
    
    const fetchProfile = async () => {
      try {
        const res = await getProfileApi();
        if (res.data) {
          setExistingProfile(res.data);
          console.log("📄 Existing profile found:", res.data);

          // Prefill form with existing profile data
          Object.keys(res.data).forEach(key => setValue(key, res.data[key]));
          if (res.data.dob) setDob(new Date(res.data.dob));
        } else {
          console.log("No existing profile found for this user.");
        }
      } catch (err) {
        console.error("Failed to fetch existing profile:", err);
      }
    };

    fetchProfile();
  }, [user, setValue, navigate]);

  const onSubmit = async (data) => {
    try {
      console.log("🔥 Form data submitted:", data);
      console.log("User email:", user.email);

      if (existingProfile) {
        // Update existing profile
        await updateProfileApi(data);
        toast.success("Profile updated successfully!");
      } else {
        // Create new profile
        await createProfileApi({ ...data, email: user.email, fullyRegistered: true });
        toast.success("Profile created successfully!");
      }

      // Save token if exists
      if (token) localStorage.setItem("token", token);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error("💥 Error saving profile:", err);
      toast.error("Failed to save profile");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setValue("profileImage", reader.result);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setValue("profileImage", reader.result);
    reader.readAsDataURL(file);
  };

  const inputClasses = "w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 transition";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-full max-w-md sm:max-w-2xl rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
        <ToastContainer position="top-center" />
        <h2 className="text-2xl font-bold text-center text-purple-700 mt-2">
          {existingProfile ? "Edit Your Profile" : "Complete Your Profile"}
        </h2>

        {/* Profile Image */}
        <div onClick={() => fileInputRef.current.click()} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-purple-600 mx-auto my-4 bg-white shadow flex items-center justify-center overflow-hidden cursor-pointer">
          {profileImage ? <img src={profileImage} alt="Profile" className="w-full h-full object-cover" /> : <ImagePlus className="text-purple-500 w-6 h-6 sm:w-8 sm:h-8" />}
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
        </div>

        <input type="hidden" {...register("profileImage")} />

        {/* Names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input {...register("firstName", { required: true })} className={inputClasses} />
            {errors.firstName && <span className="text-red-500 text-sm">Required</span>}
          </div>
          <div>
            <label>Last Name</label>
            <input {...register("lastName")} className={inputClasses} />
          </div>
        </div>

        <div>
          <label>Email</label>
          <input className={inputClasses} readOnly {...register("email")} />
        </div>

        <div>
          <label>Phone</label>
          <input {...register("phone", { required: true })} className={inputClasses} />
        </div>

        <div>
          <label>Date of Birth</label>
          <DatePicker selected={dob} onChange={(date) => { setDob(date); setValue("dob", date ? date.toISOString().split("T")[0] : ""); }} className={inputClasses} isClearable />
        </div>

        <div>
          <label>Location</label>
          <input {...register("location", { required: true })} className={inputClasses} />
        </div>

        <div>
          <label>Budget</label>
          <input {...register("budget", { required: true })} className={inputClasses} />
        </div>

        <div>
          <label>About</label>
          <textarea {...register("about")} className={`${inputClasses} h-24`} />
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700">
          {existingProfile ? "Update Profile" : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
