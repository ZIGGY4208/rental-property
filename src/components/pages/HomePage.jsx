import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../HeroSection';
import FilterSection from '../FilterSection';
import SearchByRequirement from '../SearchByRequirement';
import LuxuriousPropertiesSection from '../LuxuriousPropertiesSection';
import ComfortLivingSection from '../ComfortLivingSection';
import TestimonialSection from '../TestimonialSection';
import FeatureCards from '../FeatureCards';

const HomePage = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const sections = [
    <HeroSection />,
    <FeatureCards />,
    <SearchByRequirement />,
    <LuxuriousPropertiesSection />,
    <ComfortLivingSection />,
    <TestimonialSection />,
  ];

  return (
    <div>
      {sections.map((SectionComponent, index) => (
        <motion.div
          key={index}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // triggers when 30% of the section is visible
          className="mb-12" // optional spacing between sections
        >
          {SectionComponent}
        </motion.div>
      ))}
    </div>
  );
};

export default HomePage;
