import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { UserPlus, LogIn } from "lucide-react";

import AuthForm from "./components/AuthForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Toaster />

      {/* DESKTOP VERSION */}
      <div className="relative w-full max-w-[900px] h-[550px] bg-white shadow-2xl rounded-2xl overflow-hidden hidden md:block">
        {/* FORM PANEL */}
        <motion.div
          initial={false}
          animate={{ x: isLogin ? "0%" : "100%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center bg-white z-10"
        >
          <div className="w-full max-w-md mx-auto">
            <AuthForm isLogin={isLogin} />
          </div>
        </motion.div>

        {/* BANNER PANEL */}
        <motion.div
          initial={false}
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-1/2 h-full bg-purple-700 text-white flex flex-col items-center justify-center text-center px-10 z-20"
        >
          {isLogin ? (
            <>
              <h2 className="text-3xl font-bold mb-4">Hello Friend!</h2>

              <p className="mb-6">Don't have an account yet?</p>

              <button
                onClick={() => setIsLogin(false)}
                className="flex items-center gap-2 border px-6 py-2 rounded-full hover:bg-white hover:text-purple-700 transition"
              >
                <UserPlus size={18} />
                Create Account
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>

              <p className="mb-6">Already have an account?</p>

              <button
                onClick={() => setIsLogin(true)}
                className="flex items-center gap-2 border px-6 py-2 rounded-full hover:bg-white hover:text-purple-700 transition"
              >
                <LogIn size={18} />
                Sign In
              </button>
            </>
          )}
        </motion.div>
      </div>

      {/* MOBILE VERSION */}
      <div className="md:hidden w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <AuthForm isLogin={isLogin} mobile />

        <div className="text-center mt-6">
          {isLogin ? (
            <>
              <p className="text-gray-600">Don't have an account?</p>

              <button
                onClick={() => setIsLogin(false)}
                className="flex items-center justify-center gap-2 text-purple-600 font-semibold mx-auto"
              >
                <UserPlus size={18} />
                Create Account
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600">Already have an account?</p>

              <button
                onClick={() => setIsLogin(true)}
                className="flex items-center justify-center gap-2 text-purple-600 font-semibold mx-auto"
              >
                <LogIn size={18} />
                Sign In
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
