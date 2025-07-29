import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Building, Clock4 } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <ShieldCheck size={40} className="text-purple-600 mx-auto mb-4" />,
      title: 'Verified Listings',
      desc: 'Only vetted properties.',
    },
    {
      icon: <Building size={40} className="text-purple-600 mx-auto mb-4" />,
      title: 'Modern Hostels',
      desc: 'Clean & equipped.',
    },
    {
      icon: <Clock4 size={40} className="text-purple-600 mx-auto mb-4" />,
      title: '24/7 Help',
      desc: 'We’re always here.',
    },
  ];

  return (
    <section className="py-20 bg-white text-gray-600">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
