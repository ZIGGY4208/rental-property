import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import OfficeLocations from "./OfficeLocations";
import ContactHeroSection from "./ContactHeroSection";

const ContactPage = () => {
  const location = useLocation();
  const formRef = useRef(null);

  const fromHouse = location.state?.fromHouse;

  // Auto-scroll to the form if we came from a house
  useEffect(() => {
    if (fromHouse && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fromHouse]);

  return (
    <div className="bg-white text-black">
      <ContactHeroSection />

      {/* Optional: Display a small message above the form */}
      {/* {fromHouse && (
        <div className="text-center mt-10 px-6">
          <h2 className="text-xl font-bold text-purple-700 mb-1">
            Inquiry Regarding: {fromHouse.type}
          </h2>
          <p className="text-gray-700">Located in {fromHouse.location}</p>
        </div>
      )} */}

      <div ref={formRef}>
        {/* Pass defaultSubject to pre-fill the subject input */}
        <ContactForm
          defaultSubject={
            fromHouse
              ? `Inquiry about ${fromHouse.type} in ${fromHouse.location}`
              : ""
          }
        />
      </div>

      <ContactInfo />
      <OfficeLocations />
    </div>
  );
};

export default ContactPage;
