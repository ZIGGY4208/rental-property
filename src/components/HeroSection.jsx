import React, { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/ma.jpg')",
        height: 'calc(var(--vh, 1vh) * 100 - 80px)', // Uses CSS var for accurate viewport height minus header
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      <div
        className="
          relative z-10 h-full w-full px-4 md:pl-16
          flex flex-col
          items-center justify-center
          md:items-start md:justify-start
          text-center md:text-left
          text-white
        "
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-42">
          Find a Place You'll Love
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl">
          Affordable student rentals in Buea made simple, secure, and fast with HabiLink.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
