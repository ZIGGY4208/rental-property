// src/components/filter/CustomSelect.jsx
import React from 'react';
import { Listbox } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full bg-white border border-purple-300 px-4 py-2 rounded flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-purple-500">
            <span className="text-gray-700">{value || `Select ${label}`}</span>
            <ChevronDown className="text-purple-600" size={18} />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white border border-purple-300 rounded shadow-lg z-10">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `px-4 py-2 cursor-pointer ${
                    active ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                  }`
                }
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomSelect;
