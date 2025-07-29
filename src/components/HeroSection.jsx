import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTypewriter } from 'react-simple-typewriter';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const navigate = useNavigate();

  const [typewriterText] = useTypewriter({
    words: ["Find a Place You'll Love", "Your New Home Awaits", "Move In With Confidence"],
    loop: true,
    delaySpeed: 2000,
  });

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: 'easeOut' },
    }),
  };

  const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: 0.1, ease: 'easeOut' },
    },
  };

  const goToHousesPage = () => {
    navigate('/houses');
  };

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url('/ma.jpg')",
        height: 'calc(var(--vh, 1vh) * 100 - 80px)',
      }}
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/ma.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
        }}
      ></motion.div>

      {/* Content */}
      <div
        ref={ref}
        className="relative z-10 h-full w-full px-4 flex flex-col items-center justify-center text-center text-white space-y-6"
      >
        <motion.h1
          custom={0}
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          className="text-3xl md:text-5xl font-extrabold leading-tight h-20"
        >
          {typewriterText}
          <span className="text-purple-400">|</span>
        </motion.h1>

        <motion.h2
          initial="hidden"
          animate={controls}
          variants={slideLeft}
          className="text-lg md:text-xl font-semibold text-gray-300"
        >
          Student Rentals in Buea—Simple, Secure & Fast
        </motion.h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          custom={0.6}
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          onClick={goToHousesPage}
          className="bg-purple-600 hover:bg-purple-700 transition duration-300 text-white font-semibold py-3 px-6 rounded-xl shadow-md flex items-center gap-2"
        >
          Explore Listings <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          className="w-6 h-6 text-white opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
