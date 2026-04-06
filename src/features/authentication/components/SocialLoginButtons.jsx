import React from "react";

const SocialLoginButtons = () => {
  const socialLogins = [
    {
      name: "Google",
      icon: "https://www.svgrepo.com/show/475656/google-color.svg",
      url: "http://localhost:5000/api/auth/google",
    },
    {
      name: "Facebook",
      icon: "https://www.svgrepo.com/show/475647/facebook-color.svg",
      url: "http://localhost:5000/api/auth/facebook",
    },
    {
      name: "LinkedIn",
      icon: "https://www.svgrepo.com/show/475661/linkedin-color.svg",
      url: "http://localhost:5000/api/auth/linkedin",
    },
    {
      name: "Twitter",
      icon: "https://www.svgrepo.com/show/475689/twitter-color.svg",
      url: "http://localhost:5000/api/auth/twitter",
    },
  ];

  const handleLogin = (url) => {
    window.location.href = url;
  };

  return (
    <div className="flex justify-center gap-4 mt-4">
      {socialLogins.map((social, index) => (
        <button
          key={index}
          onClick={() => handleLogin(social.url)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:scale-110 hover:animate-pulse transition duration-300"
        >
          <img src={social.icon} alt={social.name} className="w-6 h-6" />
        </button>
      ))}
    </div>
  );
};

export default SocialLoginButtons;
