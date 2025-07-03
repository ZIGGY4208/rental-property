import React, { useRef, useState } from "react";
import { Send } from "lucide-react";

const FeedbackForm = () => {
  const formRef = useRef();
  const [toast, setToast] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current.reset(); // Clear all fields
    setToast("✅ Your message has been submitted. Thank you!");

    // Remove toast after 3.5 seconds
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <section className="max-w-3xl mx-auto my-20 px-6 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-6 py-3 rounded shadow-lg z-50 transition duration-300">
          {toast}
        </div>
      )}

      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Contact <span className="text-purple-600">Support</span>
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Didn’t receive a response after booking? Or just want to share feedback? Let us know below.
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
            required
          />
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
            required
          />
        </div>

        <input
          type="text"
          name="booking_reference"
          placeholder="Booking Reference (optional)"
          className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
        />

        <textarea
          name="message"
          placeholder="Your Message (e.g., I booked and haven’t received feedback...)"
          rows={5}
          className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded hover:bg-purple-800 transition flex items-center justify-center gap-2"
        >
          <Send size={18} /> Send Message
        </button>
      </form>
    </section>
  );
};

export default FeedbackForm;
