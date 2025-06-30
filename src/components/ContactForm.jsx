import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = ({ defaultSubject = "" }) => {
  const formRef = useRef();
  const [status, setStatus] = useState("");
  const [subject, setSubject] = useState(defaultSubject);

  // Update subject state if defaultSubject prop changes
  useEffect(() => {
    setSubject(defaultSubject);
  }, [defaultSubject]);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .sendForm(
        "service_q8pkn6f",   // Your EmailJS Service ID
        "template_gcrrpxd",  // Your EmailJS Template ID
        formRef.current,
        "3Z25IvyN_2-xaSDWn"  // Your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
          setStatus("✅ Message sent successfully!");
          formRef.current.reset(); // Clear form fields
          setSubject(""); // Clear subject state after sending
        },
        (error) => {
          console.error("Email failed:", error.text);
          setStatus("❌ Failed to send message. Try again.");
        }
      );
  };

  return (
    <section className="max-w-3xl mx-auto my-20 px-6">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
        Send Us a <span className="text-purple-600">Message</span>
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

        <input
          type="text"
          name="subject"
          placeholder="Subject (e.g. Property Inquiry)"
          className="p-3 border border-gray-300 rounded-md focus:outline-purple-600"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
          className="bg-purple-600 text-white py-3 rounded hover:bg-purple-800 transition"
        >
          Send Message
        </button>
      </form>

      {status && (
        <p className="text-center mt-4 text-sm text-gray-700">{status}</p>
      )}
    </section>
  );
};

export default ContactForm;
