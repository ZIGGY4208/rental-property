import React from "react";
import { UserPlus, LogIn } from "lucide-react";

const AuthBanner = ({ isLogin, setIsLogin }) => {
  return (
    <div
      className={`absolute top-0 w-full md:w-1/2 h-full bg-purple-700 text-white flex flex-col items-center justify-center text-center px-10 transition-transform duration-700
      ${isLogin ? "translate-x-full md:translate-x-full left-0" : "translate-x-0 left-0"}`}
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
    </div>
  );
};

export default AuthBanner;
