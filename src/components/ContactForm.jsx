import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { CalendarCheck2 } from "lucide-react";

const ContactForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const form = formRef.current;

    // Manually create FormData to modify the phone number before sending
    const formData = new FormData(form);
    formData.set("user_phone", `+237${phoneNumber.trim()}`);

    emailjs
      .sendForm(
        "service_q8pkn6f",
        "template_gcrrpxd",
        formData,
        "3Z25IvyN_2-xaSDWn"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          setStatus("✅ Appointment booked successfully!");
          form.reset();
          setPhoneNumber("");
        },
        (error) => {
          console.error("Email failed:", error.text);
          setStatus("❌ Failed to book appointment. Try again.");
        }
      );
  };

  return (
    <section className="max-w-3xl mx-auto my-20 px-6">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Book an <span className="text-purple-600">Appointment</span>
      </h2>

      <form ref={formRef} onSubmit={sendEmail} className="grid grid-cols-1 gap-6">
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

        {/* Clean Phone Input */}
        <input
          type="tel"
          name="user_phone"
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 rounded flex items-center justify-center gap-2 hover:bg-purple-800 transition"
        >
          <CalendarCheck2 size={18} />
          Book Now
        </button>
      </form>

      {status && (
        <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
      )}
    </section>
  );
};

export default ContactForm;
