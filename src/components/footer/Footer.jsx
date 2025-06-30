import React from 'react';
import AboutSection from './AboutSection';
import QuickLinks from './QuickLinks';
import ContactInfo from './ContactInfo';
import SocialLinks from './SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <AboutSection />
        <QuickLinks />
        <ContactInfo />
        <SocialLinks />
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} HabiLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
