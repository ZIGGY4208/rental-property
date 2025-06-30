import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const SocialLinks = () => (
  <div>
    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
    <div className="flex space-x-4">
      <a href="#" aria-label="Facebook" className="hover:text-blue-400">
        <Facebook size={20} />
      </a>
      <a href="#" aria-label="Twitter" className="hover:text-blue-300">
        <Twitter size={20} />
      </a>
      <a href="#" aria-label="Instagram" className="hover:text-pink-400">
        <Instagram size={20} />
      </a>
    </div>
  </div>
);

export default SocialLinks;
