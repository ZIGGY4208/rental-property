import React from "react";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

const ContactInfo = () => (
  <section
    className="relative bg-cover bg-center text-white"
    style={{ backgroundImage: "url('/060.jpg')" }} // ✅ Use correct path
  >
    {/* 🔲 Black Overlay */}
    <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

    {/* 🔤 Content */}
    <div className="relative z-10 max-w-6xl mx-auto py-16 px-6 grid sm:grid-cols-2 gap-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        <p className="mb-6">
          Have questions about our platform? Reach us through any of the options below.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center">
            <Phone className="mr-3" size={18} />
            +1 234 567 890
          </li>
          <li className="flex items-center">
            <Mail className="mr-3" size={18} />
            support@habilink.com
          </li>
          <li className="flex items-center">
            <Globe className="mr-3" size={18} />
            www.habilink.com
          </li>
          <li className="flex items-center">
            <MapPin className="mr-3" size={18} />
            Bonduma, Buea, Cameroon
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Support Hours</h3>
        <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
        <p>Saturday: 9:00 AM – 2:00 PM</p>
      </div>
    </div>
  </section>
);

export default ContactInfo;
